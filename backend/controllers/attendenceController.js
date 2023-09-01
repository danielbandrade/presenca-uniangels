const asyncHandler = require("express-async-handler");
const crypto = require("crypto"); 
const Attendence = require("../models/attendanceModel");
const Member = require("../models/memberModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const registerAttendence = asyncHandler( async (req, res) => {
    
    const{name, date, isPresent} = req.body

   

    //  Validation
    if(!name && !date &&  !isPresent) {
        res.status(400)
        throw new Error("Please fill in all required fields - NEW")
    }

    // Check if member exists
    const member = await Member.findOne({name});

    
    if(!member){
        res.status(400)
        throw new Error("Member does not exists")
    };

    // TODO: validar se essa mesma presenca já foi criada 


    // Create new presence
    
    const memberId = member._id;

    const attendance = await Attendence.create({
        member: memberId,
        date: date,
        isPresent: isPresent,
    })

    if (attendance){
        const {_id, date, member} = attendance 
        res.status(201).json({
            _id,
            member,
            date
        })

    }else{
        throw new Error("Invalid Attendece Data")
    }
    
});






module.exports = {
    registerAttendence,
};