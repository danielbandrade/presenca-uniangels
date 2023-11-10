const asyncHandler = require("express-async-handler");
const crypto = require("crypto"); 
const Attendence = require("../models/attendanceModel");
const Member = require("../models/memberModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error } = require("console");

// TODO criar header de navegacao 
// TODO criar navegacao com login
// TODO fazer a aplicacao fica bonita

const registerAttendence = asyncHandler( async (req, res) => {
    
    const attendedMembersObject =  req.body;

    console.log('register working')

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
    

const getAttendenceLog = asyncHandler( async (req, res) => {

    const attendenceCompleteLog = await Attendence.find({}).populate('member').exec();

    if (attendenceCompleteLog){
        res.status(200).json({
            attendenceCompleteLog
        })

    }else{
        throw new Error("Request Failed")
    }

});


const deleteAttendenceLog = asyncHandler( async (req, res) => {
    
    const dateToBeDeleted =  req.body.dateToBeDeleted;

    const attendencesToBeDeleted = await Attendence.find({ date: dateToBeDeleted }).deleteMany();


    if (attendencesToBeDeleted){
        res.status(200).json({
            attendencesToBeDeleted
        })

    }else{
        throw new Error("Request Failed")
    }

});


const calculateMemberAttendence = asyncHandler( async (req, res) => {
    
    const attendenceCalculation = await Attendence.aggregate([
        {
            $project: {
                member: 1,
                totalDates: {  
                    $cond: [ { $ne: ["$date", null ] }, 1, 0  ]
                },
                isPresent: {  
                    $cond: [ { $eq: ["$isPresent", true ] }, 1, 0  ]
                },
                notPresent: {  
                    $cond: [  { $eq: ["$isPresent", false ] }, 1, 0]
                }
            }
        },
        {
            $group: {
               _id: '$member',
               counttotalDates: { $sum: "$totalDates" },
               isPresentCount: { $sum: "$isPresent" },
               notPresentCount: { $sum: "$notPresent" }
           }
        },
        { $project: {counttotalDates:1, isPresentCount:1, notPresentCount:1, presentPercent: { $divide: [ "$isPresentCount", "$counttotalDates" ]}}},
        {
            $lookup: {
                from: "members",
                localField: "_id",
                foreignField: "_id",
                as: "member"
            }

        },
        {
            $project: {
                "_id": 1,
                "counttotalDates": 1,
                "isPresentCount": 1,
                "notPresentCount": 1,
                "presentPercent": 1,
                "member.name": 1,
                "member.createdAt": 1,
                "member.status": 1
            }
        }

        ]);



    if (attendenceCalculation){
        res.status(200).json({
            attendenceCalculation
        })

    }else{
        throw new Error("Request Failed")
    }



});


module.exports = {
    registerAttendence,
    getAttendenceLog,
    deleteAttendenceLog,
    calculateMemberAttendence,
};