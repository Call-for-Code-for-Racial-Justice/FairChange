const mongoose = require("mongoose");

function startDBConnection() {
  mongoose
    .set("useFindAndModify", false)
    .set("useNewUrlParser", true)
    .set("useUnifiedTopology", true)
    .connect("mongodb://127.0.0.1:27017")
    .then(() => {
      console.log("MongoDB connected....");
    })
    .catch((err) => {
      console.error("connection failure", err);
    });
}

module.exports = {
  startDBConnection,
};