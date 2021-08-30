const express = require("express");
const { signup, fetchUsers } = require("../controllers/authController");
const route = express.Router();

route.get("/", fetchUsers);
route.post("/signup", signup);

module.exports = route;