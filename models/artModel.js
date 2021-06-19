const mongoose = require("mongoose");

const artSchema = new mongoose.Schema(
  {
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
    orientation: String,
    subject: String,
    formats: Array,
  },
  {
    timestamps: true,
  }
);

const Art = new mongoose.model("Art", artSchema);

module.exports = Art;
