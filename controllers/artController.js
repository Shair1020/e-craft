const Art = require("../models/artModel");
const APIFeatures = require("../utility/common");
const multer = require('multer')
const { v4: uuid } = require("uuid");
const { shapeArtData } = require("../utility/art");

// const storage = multer.memoryStorage();
// exports.artUpload = multer({ storage: storage }).any();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/')
  },
  filename: (req, file, cb) => {
 const ext = file.mimetype.split("/")[1];
    cb(null, `art-${req.user._id}-${uuid()}-${Date.now()}.${ext}`);
  }
});

exports.artUpload = multer({ storage: storage }).any();

exports.addArt = async (req, res) => {
  try {
    const artData = shapeArtData(req)
    const art = await Art.create(artData);
    // console.log(artData)
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
    var { limit } = req.query;
    var query = new APIFeatures(Art, req.query).filter().sort().fields().paginate();
    var arts = await query.get().populate("reviews");
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
    const arts = await Art.findById(artId).populate("reviews");
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

exports.likeArt = async (req, res) => {
  try {
    const { artId } = req.params;
    const { _id: userId } = req.user

    const art = await Art.findOneAndUpdate({
      _id: artId,
      likes: { $ne: userId },
    }, {
      $inc: { likesCount: 1 },
      $push: { likes: userId }
    }, {
      new: true
    })
    res.status(200).json({
      status: "like",
      data: {
        art,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
}

exports.disLikeArt = async (req, res) => {
  try {
    const { artId } = req.params;
    const { _id: userId } = req.user

    const art = await Art.findOneAndUpdate({
      _id: artId,
      likes: userId,
    }, {
      $inc: { likesCount: -1 },
      $pull: { likes: userId }
    }, {
      new: true
    })
    res.status(200).json({
      status: "dislike",
      data: {
        art,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
}