const express = require("express");
const mongoose = require("mongoose");
const mongoDB_password = "ebWVEBSSr4FfWza5";
mongoose
  .connect("mongodb+srv://shairali:ebWVEBSSr4FfWza5@cluster0.ihaqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Connected to mongodb");
    console.log(con.connections);
  });
const app = express();

app.listen(8000, () => {
  console.log("Server running on 8000");
});
