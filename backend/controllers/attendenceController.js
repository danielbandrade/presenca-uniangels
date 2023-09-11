const asyncHandler = require("express-async-handler");
const crypto = require("crypto"); 
const Attendence = require("../models/attendanceModel");
const Member = require("../models/memberModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error } = require("console");


const registerAttendence = asyncHandler( async (req, res) => {
    
    // TODO precisa refatorar para percorrer o objeto de json novo 

    const attendedMembersObject =  req.body

    //  Validation
    attendedMembersObject.forEach(member => {
        if(!member.name && !member.date &&  !member.isPresent) {
            res.status(400);
            throw new Error("Please fill in all required fields");
        } 
    });

    for(const key in attendedMembersObject) {

        // TODO encontrar uma forma de buscar os membros na base de dados
 
        const dbMember = await Member.findOne({name: attendedMembersObject[key].name})

        if(!dbMember){
            res.status(400);
            throw new Error("One Member does not exist");
        }

        // Checar se presenca já existe

        const checkAttendence = await Attendence.findOne({ member: dbMember._id , date: dbMember.date })
    

        if(checkAttendence){
            res.status(400)
            throw new Error("Attendence already exists")
        };

        const memberId = member._id;

        const attendance = await Attendence.create({
            member: attendedMembersObject[key]._id,
            date: attendedMembersObject[key].date,
            isPresent: attendedMembersObject[key].isPresent,
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
        
        }
    

    
});
    


module.exports = {
    registerAttendence,
};