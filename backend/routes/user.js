const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupbody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupbody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: "Incorrect inputs" })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({ messgae: "Email already exists" })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
    const userId = user._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000

    })
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({
        message: "user created succesfully",
        token: token
    })
})

const signinbody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
router.post("/signin", async (req, res) => {
    const { success } = signinbody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: "inputs corrected" });
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id,
            firstname: user.firstname
        }, JWT_SECRET);

        return res.json({
            token: token,
            firstname: user.firstname
        });
    }

    res.status(411).json({ message: "invalid credentials" });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const currentUserId = req.user._id;

    const query = {
        $and: [
            filter
                ? {
                    $or: [
                        { firstname: { "$regex": filter, "$options": "i" } },
                        { lastname: { "$regex": filter, "$options": "i" } }
                    ]
                }
                : {},
            { _id: { $ne: currentUserId } },
        ],
    };

    const users = await User.find(query);

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
});



module.exports = router;