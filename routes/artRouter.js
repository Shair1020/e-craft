const express = require("express");
const { addArt, getArt, fetchArt, deleteArt, upadteArt, likeArt, disLikeArt, artUpload, testArt } = require("../controllers/artController");
const { protect, restrictTo } = require("../controllers/authController");
const reviewRouter = require("./../routes/reviewRouter");
const router = express.Router();

//redirecting
router.get("/testing", testArt)

router.use("/:artId/reviews", reviewRouter)

router.route("/").get(getArt).post(protect, restrictTo("artist"), artUpload, addArt)
router.route("/:artId").get(fetchArt).delete(deleteArt).patch(upadteArt)
router.post("/:artId/like", protect, likeArt);
router.post("/:artId/dislike", protect, disLikeArt);


module.exports = router;
