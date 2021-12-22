const express = require("express");
const { fetchAllBuyers } = require("../controllers/buyerController");
const router = express.Router();

router.route("/").get(fetchAllBuyers)


module.exports = router