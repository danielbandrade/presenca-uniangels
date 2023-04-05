const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const protect = asyncHandler( async (req,res,next) => {
    try{
        const token = req.cookies.token
        if(!token){
            res.status(401)
            throw new Error("Not autorized, please login")
        }

        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // get user id from token
        user = await User.findById(verified.id).select("password");

        if (!user){
            res.status(401)
            throw new Error("User not found")
        }
        req.user = user; 
        next();

    }catch(error){
        res.status(401)
        throw new Error("Not autorized, please login")
    }
    
});

module.exports = protect;