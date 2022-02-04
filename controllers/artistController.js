const Artist = require("./../models/artistModel")

exports.fetchAllArtists = async (req, res) => {
    try {
        res.status(200).json({
            status: "Success",
            msg: "fetch all artists"
        })

    } catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message
        })
    }
}

exports.addArtist = async (artistProfile) => {
    try {
        const artist = await Artist.create(artistProfile);
        return artist

    } catch (error) {
        return new Error(error.message)
    }
}

exports.fetchArtist = async (artistId) => {
    try {
        const artist = await Artist.findOne({ userId: artistId });
        return artist

    } catch (error) {
        return new Error(error.message)
    }
}

exports.updateArtist = async (artistId, profile) => {
    try {
        const artist = await Artist.findOneAndUpdate({ userId: artistId }, profile, {
            new: true
        });
        return artist

    } catch (error) {
        return new Error(error.message)
    }
}