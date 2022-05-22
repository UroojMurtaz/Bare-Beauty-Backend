const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler= require("express-async-handler")
const User = require("../models/User")


// @desc Register new user
// @route POST /api/user
// @access Public
const registerUser = asyncHandler( async(req, res) => {
    const {userName,userId,userEmail,userPassword,userPhoneNumber,Role}=req.body

    if(!userName || !userId || !userEmail || !userPassword || !userEmail){
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists=await User.findOne({userEmail})
    if(userExists){
        res.status(400)
        throw new Error("Already Registered")
    }

    //Hash password

    const salt=await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userPassword,salt)

    const user=await User.create({
        userName,
        userId,
        Role,
        userEmail,
        userPassword:hashedPassword,
        userPhoneNumber
    })

    

    if(user){
        res.status(201).json({
            _id:user.id,
            userName:user.userName,
            userEmail:user.userEmail,
            token:generateToken(user._id)
    
        })
    }
    else{
        res.status(400)
        throw new Error("invalid user data")
    }

    
})


// @desc Authenticate User
// @route POST /api/users/login
// @access Private
const loginUser =asyncHandler( async(req, res) => {
    const {userEmail,userPassword}=req.body

    const user=await User.findOne({userEmail})

    if(user && (await bcrypt.compare(userPassword, user.userPassword))){
        res.json({
            _id:user.id,
            userName:user.userName,
            userEmail:user.userEmail,
            token:generateToken(user._id)
        })
    }else{
        console.log(user.userEmail)
        res.status(400)
        throw new Error("Invalid credentials")
        
        
    }

    res.json({ message: "login" })

})


// @desc Get user data
// @route POST /api/users/id
// @access Private
const getUserById =asyncHandler( async(req, res) => {
    const user=await User.findById(req.params.id)
    if(user){
        res.json({
            _id:user.id,
            userName:user.userName,
            userEmail:user.userEmail
        })
    }else{
        console.log(user.userEmail)
        res.status(400)
        throw new Error("user not found")
        
        
    }
    

})

// @desc Get All user data
// @route POST /api/users/
// @access Private

const getUser =asyncHandler( async(req, res) => {
    const user=await User.find()

    res.status(200).json(user)
    

})

//Generate Token

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}


module.exports = {
    registerUser, loginUser, getUser,getUserById
}