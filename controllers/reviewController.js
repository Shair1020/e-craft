const Review = require("../models/reviewModel");

exports.postReview = async (req, res) => {
    try {
        const { artId } = req.params;
        const { _id: userId } = req.user;
        req.body.art = artId;
        req.body.reviewedBy = userId
        const review = await Review.create(req.body)
        res.status(200).json({
            status: "post a review",
            data: {
                review,
            }
        })

    } catch (error) {
        console.log(error)

    }
};

exports.getReview = async (req, res) => {
    const review = await Review.find();
    // console.log(review)
    try {
        res.status(200).json({
            status: "Success",
            data: {
                review
            }
        })

    } catch (error) {
        console.log(error)

    }
};
