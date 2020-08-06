const mongoose = require("mongoose");

// hypothetical model - based one latest diagram
const incident = mongoose.model(
  "Incident",
  new mongoose.Schema({
    timestamp: String,
    incidentCategory: String,
    incidentId: String,
    description: String,
    location: String, //not sure what dataType this would be
    lat: Number, // more realistic location data. 
    lon: Number,
    country: String,
    state: String,
    city: String,
    topic: String
  })
);
module.exports = incident;