const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
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
        default: "artist"
    }
    //bankingInfo
    //address Info
}, {
    timestamps: true
});

const Artist = new mongoose.model("Artist", artistSchema);
module.exports = Artist;
