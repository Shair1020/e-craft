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
        reviewedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        art: mongoose.Schema.ObjectId,
    },
    {
        timestamps: true,
    }
);

reviewSchema.pre(/^find/, function (next) {
    //this -> query
    this.populate({
        path: "reviewedBy",
        select: "username email"
    })
    next();
})
const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
