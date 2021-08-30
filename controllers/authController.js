const User = require("../models/authModel")
const JWT = require("jsonwebtoken");


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
        const token = JWT.sign({ id: user._id }, process.env.JWT_WEB_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
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
