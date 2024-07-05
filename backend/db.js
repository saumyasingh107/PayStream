
const mongoose = requre("mongoose");

mongoose.connect("mongodb://localhost:27017/")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        Unique: true,
        minLength: 4,
        maxLength: 12
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 12

    },
    firstName: {
        type: String,
        required: true,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 20
    }

})
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
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