
require("dotenv").config()
const app = require('./app')
const mongoose = require("mongoose");

const DB =process.env.MONGO_STRING.replace("<PASSWORD>",process.env.MONGO_PASSWORD)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Connected to mongodb");
    // console.log(con.connections);
  });
app.listen(process.env.PORT, () => {
  console.log("Server running on 8000");
});
