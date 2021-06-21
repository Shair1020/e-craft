const User = require("../models/authModel")

exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            status: "Sucees",
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
