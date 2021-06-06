
const Art = require("../models/artModel");

exports.addArt = async (req, res) => {
  try {
    var art = await Art.create(req.body);
    console.log(art);
    console.log("art called");
    res.status(200).json({
      status: "sucess",
      data: { art },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: error.message,
    });
  }
};