
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

const User = mongoose.model("User", userSchema)
module.exports = {
    User
}