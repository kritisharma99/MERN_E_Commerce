import User from "../models/User_Schema"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"

export const cookieOptions ={
    expires:new Date(Date.now() + (60*24*3600000)),
    httpOnly:true,
    //could be in a separat file in utils
}

/*********************************************
 * @signUp a function handles sign up activity
 * @route /app
 * @description
 * @parameters
 * @returns
 ********************************************/

export const signUp =asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        throw new CustomError('Please fill all the fields',400)
    }
    //check if user exists
    const existingUser = await User.findOne(email)
    if(existingUser){
        throw new CustomError('User already exists',400)
    }
    //create the user
    const user = User.create({
        name,
        email,
        password
    });
    const token = user.getJwtToken()
    console.log(user)
    //still we get password in frontend despite of being use select:false in User_Schema.js
    //This is because querying mongodb and creating a mongodb both are diffrent.
    //dusring querying we get password : undefined due to select:false but not in create case
    //To ensure we use:
    user.password=undefined
    res.cookie("token",token,cookieOptions)
    res.status(200).json({
        success:true,
        token,
        user
    })
})



