const Art = require("../models/artModel");
const APIFeatures = require("../utility/common");

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

exports.getArt = async (req, res) => {
  try {
    console.log(req.user)
    var { limit } = req.query;
    var query = new APIFeatures(Art, req.query).filter().sort().fields().paginate();
    var arts = await query.get();
    var totalPages = Math.ceil((await Art.countDocuments()) / limit);
    res.status(200).json({
      status: "success",
      pages: totalPages,
      results: arts.length,
      data: {
        arts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

exports.fetchArt = async (req, res) => {
  try {
    const { artId } = req.params;
    const arts = await Art.find({ _id: artId });
    res.status(200).json({
      status: "sucess",
      results: arts.length,
      data: {
        arts,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.deleteArt = async (req, res) => {
  try {
    const { artId } = req.params;
    const arts = await Art.findOneAndDelete({ _id: artId });
    res.status(200).json({
      status: "Delete art",
      results: arts.length,
      data: {
        arts,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.upadteArt = async (req, res) => {
  try {
    const { artId } = req.params;
    const arts = await Art.findOneAndUpdate({ _id: artId }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "upadte art",
      data: {
        arts,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
