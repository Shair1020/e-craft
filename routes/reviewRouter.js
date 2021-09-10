const express = require("express");
const { getReview, postReview } = require("../controllers/reviewController");

const router = express.Router();

router.route("/").get(getReview).post(postReview);

module.exports = router;