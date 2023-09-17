const asyncHandler = require("express-async-handler");
const crypto = require("crypto"); 
const Attendence = require("../models/attendanceModel");
const Member = require("../models/memberModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error } = require("console");


// TODO o registro de presenca para 5 membros nao funcionou corretamente

const registerAttendence = asyncHandler( async (req, res) => {
    
    const attendedMembersObject =  req.body;

    //  Validation
    attendedMembersObject.forEach(member => {
        if(!member.name && !member.date &&  !member.isPresent) {
            res.status(400);
            throw new Error("Please fill in all required fields");
        } 
    });

    let sucessRegister = 0;

    for(const key in attendedMembersObject) {
 
        // TODO ele so esta olhando para um mebro

        const dbMember = await Member.findOne({name: attendedMembersObject[key].name})

        if(!dbMember){
            res.status(400);
            throw new Error("One Member does not exist");
        }

        // Checar se presenca já existe

        const checkAttendence = await Attendence.findOne({ member: dbMember._id , date: attendedMembersObject[key].date })
    
        if(checkAttendence){
            res.status(400);
            throw new Error("Registro já existente");
        };
        

        const attendance = await Attendence.create(
            {
            member: dbMember._id,
            date: attendedMembersObject[key].date,
            isPresent: attendedMembersObject[key].isPresent,
            }
        );

        if(attendance){
            sucessRegister = sucessRegister + 1;
            console.log(sucessRegister)
        }

    }


    if (sucessRegister = attendedMembersObject.length()){
        res.status(201).json({
            sucessRegister
        })

    }else{
        throw new Error("Invalid Attendece Data")
    }
    
});
    
// TODO criar funcao para retornar presenca dos membros

const getAttendenceLog = asyncHandler( async (req, res) => {
    
    res.status(201).json("This Worked");

});


module.exports = {
    registerAttendence,
    getAttendenceLog
};