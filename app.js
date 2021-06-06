const express = require("express");
const artRouter = require("./routes/artRouter");

const app = express();

app.use(express.json());

//routes 
app.use("/api/v1/arts", artRouter);
module.exports = app;
