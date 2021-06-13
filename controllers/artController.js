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
