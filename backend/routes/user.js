const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const Random = require("faker/lib/random");

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
        return res.status(411).json({ message: "Email already taken / Incorrect inputs" })
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
    password: zod.string
})

router.post("/signin", async (req, res) => {
    const { success } = signinbody.safeParse(req.body);
    if (!success) {
        res.status(411).json({ message: "inputs corrected" })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({

        message: "error while loging in"
    })
})

const bodyUpdate = zod.object({
    username: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),

})

router.put("/", authMiddleware, async (req, res) => {

    const { success } = bodyUpdate.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "error whileupdating information"
        })

    }
    await User.updateOne({ _id: req.userId }, req.body)
    res.json({
        msg: "information updated succesfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter,
                "$options": "i"
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id

        }))
    })
})


module.exports = router;