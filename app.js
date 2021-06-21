const express = require("express");
const artRouter = require("./routes/artRouter");
const authRouter = require("./routes/authRouter");

const app = express();

app.use(express.json());

//routes
app.use("/api/v1/arts", artRouter);
app.use("/api/v1/auth", authRouter);

module.exports = app;
