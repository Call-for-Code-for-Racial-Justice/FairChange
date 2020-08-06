const express = require("express");
const router = express.Router();
const service = require("../service/incidentService")

router.get("/", (req, res) => {
 // FE/map code should hit this endpooint to get user data which will include mapping coordinates
});

router.post("/", (req, res) => {
    service.createincident(req.body)
    // FE/mobile  should hit this endpooint to send user data
});

module.exports = {router}