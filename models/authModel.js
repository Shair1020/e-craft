const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    role: {
        type: String,
        required: [true, "role is required!"],
        enum: ["artist", "buyer"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    displayPicture: {
        type: String,
        default:"default.png"
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: 8,
        select: false,
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
    },
    passwordChanged: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresAt: Date,
});

userSchema.methods.passwordVerification = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

userSchema.methods.passwordTokenGenerator = function () {
    // generate random string 32bit
    const resetToken = crypto.randomBytes(32).toString('hex');
    //encrpyt reset token
    const encryptedResetToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    //save encrypt reset token in user collection
    this.passwordResetToken = encryptedResetToken
    this.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;
    //return non-encrypt reset token
    return resetToken;
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") && !this.isNew) return next();
    this.passwordChanged = Date.now() - 1000
    next();
})

userSchema.pre("save", async function (next) {
    //this -> document
    if (!this.isModified("password")) return next();
    var encryptedPassword = await bcrypt.hash(this.password, 12); //number brute force attack
    this.password = encryptedPassword;
    this.confirmPassword = undefined;
    next();
})

const User = new mongoose.model("User", userSchema);
module.exports = User;
