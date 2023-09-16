const express = require("express");
const router = express.Router();


const { 
    registerAttendence, 
    getAttendenceLog
} = require("../controllers/attendenceController");


router.post("/register", registerAttendence);
router.get("/getAttendenceLog", getAttendenceLog);


module.exports = router; 


