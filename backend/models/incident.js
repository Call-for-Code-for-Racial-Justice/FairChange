const mongoose = require("mongoose");

// hypothetical model - based one latest diagram
const incedent = mongoose.model(
  "Incident",
  new mongoose.Schema({
    date: String,
    incidentCategory: String,
    incidentId: String,
    //location: String, not sure what dataType this would be
    lat: Number, // more realistic location data. 
    lon: Number,
    state: String,
    topic: String,
  })
);
module.exports = incedent;