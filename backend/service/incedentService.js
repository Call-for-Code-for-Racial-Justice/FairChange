const Incident = require("../models/incident");


async function createIncedent(incedentObj) {
    // store a new incedent
    try {
        return await new Incident(incedentObj).save();
      } catch (error) {
        return error;
      }
}

async function getIncedent(id) {
    // query db for incedent with specified ID
    try {
        return await Incident.findOne({ _id: id });
      } catch (error) {
        return error;
      }
}

module.exports = {
    createIncedent,
    getIncedent
};