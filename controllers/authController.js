const User = require("../models/authModel")
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const signJWT = (userId) => {
    return JWT.sign({ id: userId }, process.env.JWT_WEB_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
exports.fetchUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({
            status: "Sucess",
            data: {
                user,
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message
        })

    }
}

exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const { password, ...modifiedUser } = user.toObject()
        ///JWT TOKEN
        const token = signJWT(user._id);
        res.status(200).json({
            status: "Sucess",
            token,
            data: {
                user: modifiedUser,
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message
        })

    }
}

exports.login = async (req, res) => {
    try {
        var { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                status: "error",
                error: "please enter email and password"
            });
        }
        const user = await User.findOne({ email }).select("+password");
        const verifiedPassword = await user.passwordVerification(password, user.password);
        if (!(verifiedPassword) || !user) {
            return res.status(401).json({
                status: "error",
                error: "Invalid email and password"
            });
        }
        const token = signJWT(user._id);
        var { password, ...modifiedUser } = user.toObject()
        // user.password="";
        res.status(200).json({
            status: "Success",
            token,
            data: {
                user: modifiedUser,
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message
        })

    }
}
