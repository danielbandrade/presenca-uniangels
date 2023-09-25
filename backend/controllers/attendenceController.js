const asyncHandler = require("express-async-handler");
const crypto = require("crypto"); 
const Attendence = require("../models/attendanceModel");
const Member = require("../models/memberModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { error } = require("console");


// TODO criar endpoint para calcular o pencentual de pesenca dos membros
// TODO criar header de navegacao 
// TODO exibir presenca dos membros junto com os nomes (fazer no front?)

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

    const attendenceCompleteLog = await Attendence.find({});


    // const attendenceCompleteLog = await Attendence.aggregate([{
    //     $lookup: {
    //         from: "mebers", // collection name in db
    //         localField: "member",
    //         foreignField: "_id",
    //         as: "nomesMembros"
    //     }
    // }]).exec(function(err, students) {
    //     // students contain WorksnapsTimeEntries
    // });

    // console.log(attendenceCompleteLog)

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


    // resp aqui: https://stackoverflow.com/questions/22819303/mongodb-aggregation-divide-computed-fields

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
        { $project: {counttotalDates:1, isPresentCount:1, notPresentCount:1, notPresentPercent: { $divide: [ "$isPresentCount", "$counttotalDates" ]}}}
       

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