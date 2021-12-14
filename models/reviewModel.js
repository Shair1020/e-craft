const mongoose = require("mongoose");
const { Schema: { ObjectId } } = require("mongoose")

const reviewSchema = new mongoose.Schema(
    {
        review: String,
        rating: {
            type: Number,
            min: 0,
            max: 5
        },
        reviewedBy: mongoose.Schema.ObjectId,
        art: mongoose.Schema.ObjectId,
    },
    {
        timestamps: true,
    }
);

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
