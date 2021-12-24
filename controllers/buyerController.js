const Buyer = require("./../models/buyerModel")

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

exports.addBuyer = async (buyerProfile) => {
    try {
        const buyer = await Buyer.create(buyerProfile);
        return buyer;

    } catch (error) {
        return new Error(error.message);
    }
}

exports.fetchBuyer = async (buyerId) => {
    try {
        const buyer = await Buyer.findOne({userId:buyerId});
        return buyer 
        
    } catch (error) {
        return new Error(error.message)
    }
    }