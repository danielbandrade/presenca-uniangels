const express = require("express");
const router = express.Router();


const { 
    registerAttendence, 
} = require("../controllers/attendenceController");


router.post("/register", registerAttendence);

module.exports = router; 


