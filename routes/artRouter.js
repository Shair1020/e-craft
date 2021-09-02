const express = require("express");
const { addArt, getArt, fetchArt, deleteArt, upadteArt } = require("../controllers/artcontroller");
const { protect, restrictTo } = require("../controllers/authController");
const router = express.Router();


router.route("/").get(getArt).post(protect, restrictTo("artist"), addArt)
router.route("/art/:artId").get(fetchArt).delete(deleteArt).patch(upadteArt)

module.exports = router;
