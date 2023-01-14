import User from "../models/User_Schema"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"
import mailHelper from "../utils/mailHelpers"
import crypto from "crypto"

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
    const existingUser = await User.findOne({email})
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

/*********************************************
 * @LogIn a function handles sign up activity
 * @route /app
 * @description
 * @parameters
 * @returns
 ********************************************/

 export const LogIn =asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        throw new CustomError('Please fill all the fields',400)
    }

    const user = User.findOne({email}.select("+password"))

    if(!user){
        throw new CustomError("Invalid credentials",400)    
    }
    //encrypt password
    const isPasswordMatched = await user.comparepassword(password)

    if(isPasswordMatched){
        const token = user.getJwtToken()
        user.password=undefined
        res.cookie("token",token,cookieOptions)
    }
    throw new CustomError("invalid credential")
 })

 /*********************************************
 * @LogOut a function handles sign up activity
 * @route /app
 * @description
 * @parameters
 * @returns
 ********************************************/
  export const LogOut =asyncHandler(async(req,res)=>{
        res.cookie("token",null,{
            expires:new Date(date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success:true,
            message:"Logged out successfully!"
    
 })
})

/*********************************************
 * @forgotPassword a function handles sign up activity
 * @route http://localhost:5000/api/auth/password/forgot
 * @description
 * @parameters
 * @returns
 ********************************************/
 export const forgotPassword =asyncHandler(async(req,res)=>{
    const {email} = req.body
    //check email for null
    const user = await User.findOne({email})
    if(!user){
        throw new CustomError("Email doesn't exixts",404)
    }
    const resetToken = user.generateForgotPasswordToken()
    //save to database
    //validateBeforesave:false because it is validate name,email eveything that thing we don't want
    await user.save({validateBeforeSave:false})
    //reset url
    //http or htpps://
    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`
    const text = `Password rest url is \n ${resetToken}`
    try{
        await mailHelper({
            email:user.email,
            subject:"Password reset link",
            text:text
        })
        res.status(200).json({
            success : true,
            message:`Email send to ${user.email}`
        })

    }
    catch(error){
        //roll back the changes 
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined

        await user.save({validateBeforeSave:false})
        throw new CustomError("Email sent failure",500)

    }

 })

 /*********************************************
 * @resetPassword a function handles sign up activity
 * @route http://localhost:5000/api/auth/password/reset/:resetToken
 * @description
 * @parameters
 * @returns
 ********************************************/ 

 export const resetPassword =asyncHandler(async(req,res)=>{ 
    const {token:resetToken} = req.params
    //this token is simple but in our database token is encrypted
    //so in need to compare firstly we have to encrypt the password
    const {password,confirmPassword} = req.body

    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')

    const user = await User.findOne({
        forgotPasswordToken:resetPasswordToken,
        forgotPasswordExpiry:{$gt: Date.now()}
    })
    if(!user){
        throw new CustomError("Passed token is invalid or expired",40)
    }
    if(password !==confirmPassword){
        throw new CustomError("password is not matched",)
    }
    user.password = password
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined

    await user.save()

    const token = user.getJwtToken()
    user.password = undefined

    res.cookie("token",token, cookieOptions)
    res.status(200).json({
        success:true,
        user
    })


 })

 //TODO: create a controller for change password
 //middleware

/*********************************************
 * @getProfile a function handles user profile activity
 * @route /app
 * @description
 * @parameters
 * @returns
 ********************************************/

export const getProfile = asyncHandler(async(req,res,)=>{
    const {user } = req
    if(!user){
        throw new CustomError("User not found",404)

    }
    res.status(200).json({
        success:true,
        user
    })
})
