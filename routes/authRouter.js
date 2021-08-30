const express = require("express");
const { signup, fetchUsers, login } = require("../controllers/authController");
const route = express.Router();

route.get("/", fetchUsers);
route.post("/signup", signup);
route.post("/login", login)


module.exports = route;