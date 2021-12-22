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