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

exports.getArt = async (req, res) => {
  var { role, moreData, ...resQueries } = req.query;
  try {
    //modelled the query
    var { role, moreData, ...resQueries } = req.query;
    var queryString = JSON.stringify(resQueries);
    var query = queryString.replace(/\b(gt|lt|gte|lte)\b/g, (match) => {
      return `$${match}`;
    });
    var queryObj = JSON.parse(query);
    //pass the query
    var arts = await Art.find(queryObj);
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

exports.fetchArt = async (req, res) => {
  try {

    const { artId } = req.params
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
    const { artId } = req.params
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
    const { artId } = req.params
    const arts = await Art.findOneAndUpdate({ _id: artId }, req.body, { new: true });
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