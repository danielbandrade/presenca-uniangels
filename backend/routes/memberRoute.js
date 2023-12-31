const express = require("express");
const router = express.Router();

const { 
    registerMember,
    getMembers, 
} = require("../controllers/memberController");
const protect = require("../middleWare/authMiddleware");


router.post("/register", protect, registerMember);
router.get("/getmembers", protect ,getMembers);

module.exports = router; 


