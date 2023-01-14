import User from "../models/User_Schema.js"
import JWT from "jsonwebtoken"

import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"
import config from "../config/index.js"

export const isLoggedIn = asyncHandler(async(req,_res,next)=>{

    let token;

    if(req.cookies.token || req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new CustomError("Not Authorize to access",401)
    }

    try {
        const decodedJWT = JWT.verify(token,config.JWT_SECRET)
        //_id,find user based on id,set this in req.user
        req.user = await User.findById(decodedJWT._id,"name email role")
        next()

    } catch (error) {
        console.log(error)
        throw new CustomError("Not Authorize to access",401)
    }
})

