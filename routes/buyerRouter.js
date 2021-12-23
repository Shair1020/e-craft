const express = require("express");
const { fetchAllBuyers, addBuyer } = require("../controllers/buyerController");
const router = express.Router();

// router.route("/").post(addBuyer)


module.exports = router