const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

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
            userID: user._id
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

module.exports = router;