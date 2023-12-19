const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 


const generateToken = (id) => {

    return jwt.sign( {id}, process.env.JWT_SECRET, {expiresIn: "1d"} );

};

// Register New User 
const registerUser = asyncHandler( async (req, res) => {
    const{name, email, password} = req.body

    //  Validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill in all required fields")
    }
    if (password.lenght < 6){
        res.status(400)
        throw new Error("Password must be up to 6 characters")
    }

    // Check if user email already exist 
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400)
        throw new Error("Email already been registered")
    };

    // Create new User 
    
    const user = await User.create({
        name,
        email,
        password,
    })

    // Generate Token 
    const token = generateToken(user._id);

    // send http-only cookie

    res.cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 84600), // 1 day
        sameSite: "none",
        secure: true
    })

    res.cookie("custom", "daniel-header", {
        path: "/",
        expires: new Date(Date.now() + 1000 * 84600), // 1 day
        sameSite: "none",
        secure: true
    })
    
    if (user){
        const {_id, name, email, photo, phone, bio} = user 
        res.status(201).json({
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
            token,  
        })

    }else{
        throw new Error("Invalid User Data")
    }

});


// Login User 
const loginUser = asyncHandler( async (req,res) => {
    
    const {email, password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("Please fill in all required fields")
    } 

    const user = await User.findOne({email})

    if(!user){
        res.status(400);
        throw new Error("User not found, please signup"); 
    }

    // user exists, check if password is correct    
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    // Generate Token 
    const token = generateToken(user._id);

    // send http-only cookie

    res.cookie("token", token, {
        path: "/", 
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 84600), // 1 day
        sameSite: "none",
        secure: true
    })

    if(user && passwordIsCorrect){
        const {_id, name, email, photo, phone, bio} = user 
        res.status(201).json({
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
            token,  
     });

    } else {
        res.status(400);
        throw new Error("Invalid email or password")
    }

});

const logout = asyncHandler( async (req,res) => {
    
    res.cookie("token", "" , {
        path: "/", 
        httpOnly: true,
        expires: new Date(0), // 1 day
        sameSite: "none",
        secure: true
    });

    return res.status(200).json({message: "Successefully Logged Out"});

});

// get user 

const getUser = asyncHandler( async (req,res) => {

    const user = await User.findById(req.user._id)

    if(user){
        const {_id, name, email, photo, phone, bio} = user 
        res.status(200).json({
            _id, 
            name, 
            email, 
            photo, 
            phone, 
            bio,
     });

    } else {
        req.status(400);
        throw new Error("User not found");
    }

});

// get login status 
const loginStatus = asyncHandler( async (req,res) => {

    const token = req.cookies.token

    
    if(!token){
        return res.json(false)
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    
    if(verified){
        return res.json(true)
    }

    return res.json(false)

});

 //Update User 
const updateUser = asyncHandler ( async (req,res) => {

    // Find User usind ID coming from request (Cookie <> Token <> ID)
    const user = await User.findById(req.user._id)    

    if(user){ 
        const { name, photo, phone, bio } = user; 

        user.name = req.body.name ?? name; 
        user.phone = req.body.phone ?? phone;
        user.bio = req.body.bio ?? bio;
        user.photo = req.body.photo ?? photo;
        
        const updatedUser = await user.save();
        
        res.status(200).json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            photo: updatedUser.photo, 
            phone: updatedUser.phone, 
            bio: updatedUser.bio,
            token: updatedUser.token, 
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }


 });

 // Change Password 
const changePassword = asyncHandler( async (req,res) => {

    const user = await User.findById(req.user._id) 
    const { password , new_password , confirm_new_password } = req.body

    if(!user){
        res.status(400)
        throw new Error("User not found")
    }

    if( !password ?? !new_password ?? !confirm_new_password){
        res.status(400)
        throw new Error("Please provide the old and new password with confirmation")
    }

    if( new_password !== confirm_new_password) {
        res.status(400)
        throw new Error("New password does not match confirmation")
    }

    if (new_password.lenght < 6){
        res.status(400)
        throw new Error("Password must be up to 6 characters")
    }

    // user exists, check if password is correct    
    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    if(user && passwordIsCorrect){
        user.password = new_password;
        await user.save();
        res.status(200).send("User password changed succefully")
    } else {
        res.status(404)
        throw new Error("Please provide the correct old password")
    }

}) 

const forgotPassword = asyncHandler( async (req,res) => {

    const {email} = req.body;

    const user = await User.findOne({email})

    if(!user){
        res.status(400);
        throw new Erro("User does not exist")
    }

    // create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    
    console.log(resetToken);

    // Hash token before saving to DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    console.log(hashedToken);

    // Save Token to DB

    await new Token ({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now() ,
        expiresAt: Date.now() + 30 * (60 * 1000) // thirty minutes
    }).save()

    res.send("Forgot Password"); 

    // construct reset url 

});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser, 
    changePassword,
    forgotPassword,
};