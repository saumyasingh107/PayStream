const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { route } = require("./user");
const { default: mongoose } = require("mongoose");

const router = express.Router();
router.get("/", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.json({ balance: account.balance });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({ msg: "insufficient balance" })
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "invalid account"
        })
    }
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    await session.commitTransaction();
    session.endSession();
    res.json({ msg: "transfer successful" })

})


module.exports = router;