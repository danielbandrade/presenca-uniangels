const express = require("express");
const router = express.Router();


const { 
    registerAttendence, 
    getAttendenceLog,
    deleteAttendenceLog,
    calculateMemberAttendence,
} = require("../controllers/attendenceController");
const protect = require("../middleWare/authMiddleware");


router.post("/register", registerAttendence);
router.get("/getattendencelog", protect, getAttendenceLog);
router.post("/deleteattendencelog", deleteAttendenceLog);
router.get("/calculatememberattendence", protect ,calculateMemberAttendence);




module.exports = router; 


