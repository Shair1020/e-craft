const express = require("express");
const { fetchAllArtists } = require("../controllers/artistController");
const router = express.Router();

router.route("/").get(fetchAllArtists)


module.exports = router