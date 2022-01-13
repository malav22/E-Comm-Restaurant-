const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


//Create user
exports.createUser = catchAsyncErrors(async(req, res, next) => {

    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id : "Sample id",
            url : "sample url",
        },
    });

    const token = user.getJWTToken();

    sendToken(user,201,res);
});

//Login User

exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
    const {email,password} = req.body;

    //Checking if both email and password are given
    if(!email || !password){
        return next(new ErrorHander("Please enter email and password"),400);
    }

    const user = await User.findOne({email}).select("+password");
    
    if(!user){
        return next(new ErrorHander("Invalid email or password"),401);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password"),401);
    }
    const token = user.getJWTToken();

    sendToken(user,200,res);
});

//Logout user

exports.logout = catchAsyncErrors(async(req, res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
            success : true,
            message : "Logged out successfully.",
        }
    );
});