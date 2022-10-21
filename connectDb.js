const mongoose = require("mongoose");

function connectDB(req, res) {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected succesfully");
    })
    .catch((err) => console.log(err));
}

module.exports = connectDB;
