const User = require("../models/authModel")
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const { promisify } = require("util")
const crypto = require("crypto");
const sendEmail = require("../utility/email");
const { addArtist, fetchArtist, updateArtist } = require("./artistController");
const { addBuyer, fetchBuyer, upadateBuyer } = require("./buyerController");
// const Artist = require("../models/artistModel");
// const Buyer = require("../models/buyerModel");


const signJWT = (userId) => {
    return JWT.sign({ id: userId }, process.env.JWT_WEB_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const createAndSendToken = (user, res) => {
    var token = signJWT(user.userId);
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? false : true,  //this will only valid for HTTPS connection
        httpOnly: true //transfer only in http/https protocols
    })
    res.status(200).json({
        status: "success",
        token, //browser local || cookie
        data: {
            user
        },
    });
};
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
        const profile = {
            username: user.username,
            email: user.email,
            userId: user._id,
            title: user.title,
            description: user.description,
        }
        let userProfile = null;
        if (user.role === "artist") {
            userProfile = await addArtist(profile)
        }

        if (user.role === "buyer") {
            userProfile = await addBuyer(profile)
        }
        createAndSendToken(userProfile, res)
        // const { password, ...modifiedUser } = user.toObject()
        ///JWT TOKEN
        // const token = signJWT(user._id);
        // res.status(200).json({
        //     status: "Sucess",
        //     token,
        //     data: {
        //         user: modifiedUser,
        //     }
        // })
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
        let userProfile = null;
        if (user.role === "artist") userProfile = await fetchArtist(user._id)
        if (user.role === "buyer") userProfile = await fetchBuyer(user._id)
        createAndSendToken(userProfile, res);
        // const token = signJWT(user._id);
        // var { password, ...modifiedUser } = user.toObject()
        // // user.password="";
        // res.status(200).json({
        //     status: "Success",
        //     token,
        //     data: {
        //         user: modifiedUser,
        //     }
        // })
    } catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message
        })

    }
}

// exports.updateProfile = async (req, res) => {
//     try {
//         console.log(req.body)
//         const { role, email, username, _id } = req.body;
//         const user = await User.findByIdAndUpdate({ _id:_id }, req.body, {
//             new: true
//         })
//         console.log(user)
//         const profile = {
//             username: user.username,
//             email: user.email,
//             userId: user._id
//         }
//         let userProfile = null;
//         if (user.role === "artist") userProfile = await Artist.findOneAndUpdate({ userId: _id }, profile, {
//             new: true
//         })
//         else if (user.role === "buyer") userProfile = await Buyer.findOneAndUpdate({ userId: _id }, profile, {
//             new: true
//         })
//         res.status(200).json({
//             status: "profile Update",
//             data: {
//                 userProfile,
//             },
//         });
//     } catch (error) {
//         res.status(404).json({
//             error: error.message,
//         });
//     }
// };

exports.updateProfile = async (req, res) => {
    try {
        const { profileId } = req.params;
        const user = await User.findByIdAndUpdate({ _id: profileId }, req.body, {
            new: true
        })
        const profile = {
            username: user.username,
            email: user.email,
            title: user.title,
            description: user.description,
        }
        let userProfile = null;
        if (user.role === "artist") userProfile = await updateArtist(user._id, profile)
        else if (user.role === "buyer") userProfile = await upadateBuyer(user._id, profile)
        res.status(200).json({
            status: "profile Update",
            data: {
                userProfile,
            },
        });
    } catch (error) {
        res.status(404).json({
            error: error.message,
        });
    }
};

exports.protect = async (req, res, next) => {
    try {
        var token = null;
        //fetch token from request header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }
        //check if token exist
        if (!token) {
            return res.status(401).json({
                error: "Please sign in",
            })
        }
        //verify
        const { id: userId, iat: tokenIssuedAt } = await promisify(JWT.verify)(token, process.env.JWT_WEB_SECRET)
        //check if user exist in DB 
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({
                error: "user belonging to this token does not exist!",
            });
        }
        //check user if sign in then password changed
        const passwordChangedAt = user.passwordChanged
        if (passwordChangedAt) {
            const isPasswordChangedAfter = passwordChangedAt.getTime() > tokenIssuedAt * 1000;
            if (isPasswordChangedAfter) {
                return res.status(401).json({
                    error: "password has been changed ,please login again!",
                });
            }
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(404).json({
            status: "error",
            error: error.message
        })
    }
}

exports.restrictTo =
    (...roles) =>
        async (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(401).json({
                    error: "you dont have access to perform this action!",
                });
            }
            next();
        };

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        //1- fetch user on the basis of email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "error",
                error: "no user found!",
            })
        }
        //2- generate reset token
        const resetPasswordToken = user.passwordTokenGenerator();
        await user.save({ validateBeforeSave: false });
        //3- send it to user email
        var msg = `please click to that link for changing your password, note that the link will expires in 10 min -  http://localhost:8000/api/v1/auth/reset-password/${resetPasswordToken}`;
        await sendEmail({ to: email, subject: "password reset Token", content: msg })
        res.status(200).json({
            msg: "forgot Password"
        })

    } catch (error) {
        return res.status(404).json({
            status: "error",
            error: error.message
        })

    }

}
exports.resetPassword = async (req, res) => {
    try {
        //get user on the basis of passwordResetToken
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
        const encryptedResetToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        var user = await User.findOne({
            passwordResetToken: encryptedResetToken,
            passwordResetTokenExpiresAt: { $gt: Date.now() },
        });
        //if user doesnt exist then send error in response
        if (!user) {
            return res.status(401).json({
                error: "token doesnt exist or has been expired!",
            });
        }
        //set user new password
        user.password = password;
        user.confirmPassword = confirmPassword;
        user.passwordResetToken = undefined;
        await user.save();
        createAndSendToken(user, res);
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiresAt = undefined;
        user.confirmPassword = null;
        await user.save({ validateBeforeSave: false });
        return res.status(404).json({
            status: "error",
            error: error.message,
        });
    }
};