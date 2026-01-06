const express = require("express");
const { getLocation } = require("../controllers/locationController");

const router = express.Router();

// GET /api/location?city=Pune
router.get("/location", getLocation);

module.exports = router;
