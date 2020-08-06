const Incident = require("../models/incident");


async function createIncident(incidentObj) {
    // store a new incident
    try {
        return await new Incident(incidentObj).save();
      } catch (error) {
        return error;
      }
}

async function getIncident(id) {
    // query db for incident with specified ID
    try {
        return await Incident.findOne({ _id: id });
      } catch (error) {
        return error;
      }
}

module.exports = {
    createIncident,
    getIncident
};