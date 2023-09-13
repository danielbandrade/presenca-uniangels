const asyncHandler = require("express-async-handler");
const crypto = require("crypto"); 
const Attendence = require("../models/attendanceModel");
const Member = require("../models/memberModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error } = require("console");


const registerAttendence = asyncHandler( async (req, res) => {
    
    const attendedMembersObject =  req.body

    //  Validation
    attendedMembersObject.forEach(member => {
        if(!member.name && !member.date &&  !member.isPresent) {
            res.status(400);
            throw new Error("Please fill in all required fields");
        } 
    });

    for(const key in attendedMembersObject) {
 
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

        console.log("passamos por aqui antes");

        // TODO não esta criando a presenca abaixo

        //console.log(dbMember._id);
        //console.log(attendedMembersObject[key].date);
        //console.log(attendedMembersObject[key].isPresent);

        
        const attendance = await Attendence.create(
            {
            member: dbMember._id._id,
            date: attendedMembersObject[key].date,
            isPresent: attendedMembersObject[key].isPresent,
            },(error, createdDoc) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log('New document created:', createdDoc);
                }
            }
        );
        

        console.log("passamos por aqui");

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