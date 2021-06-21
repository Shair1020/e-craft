const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: [true, "confirmPassword is required"],
        validate: [
            function (val) {
                //this -> document
                return val === this.password;
            },
            "passowrd not match ",
        ],
    }
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return next();
    const encryptPassword = await bcrypt.hash(this.password, 12)
    this.password = encryptPassword
    this.confirmPassword = undefined
})

const User = new mongoose.model("User", userSchema);
module.exports = User;
