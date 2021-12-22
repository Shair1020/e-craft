exports.fetchAllBuyers = async (req, res) => {
    try {
        res.status(200).json({
            status: "Success",
            msg: "fetch all buyers"
        })

    } catch (error) {
        res.status(404).json({
            status: "error",
            error: error.message
        })
    }
}