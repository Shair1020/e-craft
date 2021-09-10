const express = require("express");
const artRouter = require("./routes/artRouter");
const authRouter = require("./routes/authRouter");
const reviewRouter = require("./routes/reviewRouter")

const app = express();

app.use(express.json());

//routes
app.use("/api/v1/arts", artRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/review", reviewRouter);


module.exports = app;
