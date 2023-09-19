const express = require("express");
const router = express.Router();


const { 
    registerAttendence, 
    getAttendenceLog,
    deleteAttendenceLog,
} = require("../controllers/attendenceController");


router.post("/register", registerAttendence);
router.get("/getattendencelog", getAttendenceLog);
router.post("/deleteattendencelog", deleteAttendenceLog);


module.exports = router; 


