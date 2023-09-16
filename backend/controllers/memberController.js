const asyncHandler = require("express-async-handler");
const crypto = require("crypto"); 
const Member = require("../models/memberModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// Register New Member
const registerMember = asyncHandler( async (req, res) => {
    
    const{name} = req.body

    //  Validation
    if(!name) {
        res.status(400)
        throw new Error("Please fill in all required fields - NEW")
    }

    // Check if member already exist 
    const memberExists = await Member.findOne({name});

    if(memberExists){
        res.status(400)
        throw new Error("Member already been registered")
    };

    // Create new Member 
    
    const member = await Member.create({
        name
    })

    if (member){
        const {_id, name} = member 
        res.status(201).json({
            _id, 
            name, 
        })

    }else{
        throw new Error("Invalid Member Data")
    }

});


const getMembers = asyncHandler( async(req,res) => {

    console.log("passamos aqui");

    const members = await Member.find();

    // retorna as principais informações 

    const propertiesToSelect = [ "name","status", "createdAt"];

    const selectedObjects = members.map(obj => {
        const selectedProperties = Object.fromEntries(
          propertiesToSelect.map(prop => [prop, obj[prop]])
        );
        return selectedProperties;
      });

    res.status(200).json({
        selectedObjects
    })

}); 

module.exports = {
    registerMember,
    getMembers,
};