const express = require("express");
const router = express.Router();

// ajustar rota do membro

const { 
    registerMember,
    getMembers, 
} = require("../controllers/memberController");
const protect = require("../middleWare/authMiddleware");


router.post("/register", registerMember);
router.get("/getmembers", getMembers);

module.exports = router; 


