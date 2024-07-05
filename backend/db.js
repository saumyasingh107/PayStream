
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:Binu$1467@cluster0.ecetulm.mongodb.net/payStream")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        Unique: true,
        minLength: 4,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50

    },
    firstname: {
        type: String,
        required: true,
        maxLength: 20
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 20
    }

})
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    balance: {
        type: Number,
        required: true
    }

})

const User = mongoose.model("User", userSchema)
const Account = mongoose.model("Account", accountSchema)

module.exports = {
    User, Account
}