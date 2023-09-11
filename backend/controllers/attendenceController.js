const asyncHandler = require("express-async-handler");
const crypto = require("crypto"); 
const Attendence = require("../models/attendanceModel");
const Member = require("../models/memberModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function iterateOnMembers(attendedMembersObject) {
    
    attendedMembersObject.forEach(memberIterate => {
    // TODO encontrar uma forma de buscar os membros na base de dados

    const memberName = memberIterate.name    
    
        try{
        const member = Member.findOne({name: memberName}, function(err,obj) {return obj});
    
        if(!member){
            res.status(400)
            throw new Error("One Member does not exists")
        };
        console.log(obj.name);
        console.log(member.name);
        
        } catch{
            console.log("deu ruim");
        }

        });
   
}

    /*
    const checkAttendence = await Attendence.findOne({
        member._id
        ,
        member.date
    })
    
    
    if(checkAttendence){
        res.status(400)
        throw new Error("Attendence already exists")
    };


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

    */
   




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

    iterateOnMembers(attendedMembersObject);
    

    
});
    


module.exports = {
    registerAttendence,
};