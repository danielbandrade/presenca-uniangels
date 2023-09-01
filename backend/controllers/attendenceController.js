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

    const checkAttendence = await Attendence.findOne({
        name,
        date
    })

    if(checkAttendence){
        res.status(400)
        throw new Error("Attendence already exists")
    };

    // TODO: validar se essa mesma presenca já foi criada 


    // Create new presence
    
    const memberId = member._id;

    /*
            const Product = model('Product', productSchema);

        // Example query to find products with specific conditions
        const searchCriteria = {
        name: 'Product Name', // Search by product name
        category: 'Electronics', // Search by product category
        price: { $gte: 100, $lte: 500 }, // Search by price range ($gte: greater than or equal to, $lte: less than or equal to)
        };

        Product.find(searchCriteria, (err, products) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Matching Products:', products);
        }
        });
    
    
    
    */

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