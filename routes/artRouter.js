const express = require("express");
const { addArt, getArt } = require("../controllers/artcontroller");
const router = express.Router();

router.get("/", getArt);
router.post("/", addArt);

module.exports = router;
