const mongoose = require("mongoose");
const { Schema: { ObjectId } } = require("mongoose")

const artSchema = new mongoose.Schema(
  {
    artist: {
      type: ObjectId,
      ref: "User",
      required: [true, "art must belong to artist"]
    },
    title: String,
    decription: String,
    cost: Number,
    resolutionWidth: Number,
    resolutionHeight: Number,
    likes: Number,
    reviews: [
      {
        content: String,
        reviwedBy: String,
        rating: Number,
      },
    ],
    gallery: Array,
    likes: [mongoose.Schema.ObjectId],
    likesCount: {
      type: Number,
      default: 0
    },
    orientation: String,
    subject: String,
    formats: Array,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
artSchema.virtual("numberOfLikes").get(function () {
  return this.likes.length
})

artSchema.pre(/^find/, function (next) {//query middleware

  this.populate({
    path: "artist",
    select: "email username"
  })
  next()
})
const Art = new mongoose.model("Art", artSchema);

module.exports = Art;
