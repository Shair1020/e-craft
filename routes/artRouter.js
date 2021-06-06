const express = require("express");
const { addArt } = require("../controllers/artcontroller");
const router = express.Router();
router.post("/", addArt);

module.exports = router;
