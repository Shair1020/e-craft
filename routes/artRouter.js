const express = require("express");
const { addArt, getArt, fetchArt, deleteArt, upadteArt, likeArt, disLikeArt, artUpload } = require("../controllers/artcontroller");
const { protect, restrictTo } = require("../controllers/authController");
const reviewRouter = require("./../routes/reviewRouter");
const router = express.Router();

//redirecting

router.use("/:artId/reviews", reviewRouter)

router.route("/").get(getArt).post(protect, restrictTo("artist"), artUpload, addArt)
router.route("/:artId").get(fetchArt).delete(deleteArt).patch(upadteArt)
router.post("/:artId/like", protect, likeArt);
router.post("/:artId/dislike", protect, disLikeArt);


module.exports = router;
