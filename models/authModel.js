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
    console.log(resetToken)
    //encrpyt reset token
    const encryptedResetToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    console.log(encryptedResetToken)
    //save encrypt reset token in user collection
    this.passwordResetToken = encryptedResetToken
    this.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;
    //return non-encrypt reset token
    return resetToken;
}

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return next();
    const encryptPassword = await bcrypt.hash(this.password, 12)
    this.password = encryptPassword
    this.confirmPassword = undefined
})

const User = new mongoose.model("User", userSchema);
module.exports = User;
