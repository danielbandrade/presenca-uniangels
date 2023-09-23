const express = require("express");
const router = express.Router();


const { 
    registerAttendence, 
    getAttendenceLog,
    deleteAttendenceLog,
    calculateMemberAttendence,
} = require("../controllers/attendenceController");


router.post("/register", registerAttendence);
router.get("/getattendencelog", getAttendenceLog);
router.post("/deleteattendencelog", deleteAttendenceLog);
router.get("/calculatememberattendence", calculateMemberAttendence);




module.exports = router; 


