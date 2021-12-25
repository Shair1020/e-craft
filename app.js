const express = require("express");
const artRouter = require("./routes/artRouter");
const authRouter = require("./routes/authRouter");
const artistRouter = require("./routes/artistRouter")
const buyerRouter = require("./routes/buyerRouter")


const app = express();

app.use(express.json());
app.use(express.static("public"))

//routes
app.use("/api/v1/arts", artRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/artists", artistRouter);
app.use("/api/v1/buyers", buyerRouter);


module.exports = app;
