const express = require("express");
const { signup, fetchUsers, login, forgotPassword, resetPassword ,updateProfile } = require("../controllers/authController");
const route = express.Router();

route.get("/", fetchUsers);
route.post("/signup", signup);
route.post("/login", login)
route.put("/:profileId",updateProfile)
// route.put("/update-profile", updateProfile);
route.post("/forgot-password", forgotPassword);
route.post("/reset-password/:token", resetPassword)


module.exports = route;