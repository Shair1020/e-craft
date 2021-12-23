const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    displayPicture: {
        type: String,
        default:"deault.png"
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "user id is required"]
    },
    role: {
        type: String,
        default: "buyer"
    }
    //address
}, {
    timestamps: true
});

const Buyer = new mongoose.model("Buyer", buyerSchema);
module.exports = Buyer;
