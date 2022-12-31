import mongoose from 'mongoose'
import Authroles from "../utils/Authroles"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import crypto from "crypto"
import config from '../config/index'

const userSchema = mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,"Name is required"],
        maxLength:[50,"Name length must be upto 50"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        // maxLength:[50,"Name length must be upto 50"]
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"Password atleast 8 character"],
        select:false
        //make it undefined
    },
    roles:{
        type:String,
        //enums in mongoose
        //enum : ['NEW,'STATUS'],
        enum : Object.values(Authroles),
        //making array of object values
        default:Authroles.USER

    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,

},
{
    timestamps:true
});

//Challenge 1: encrypt password
userSchema.pre("save",async function(next){
    //if user update name only then also this line executes n it encrypt blank space to avoid this we use
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()   
})

userSchema.methods={
    //compare password
    comparepassword : async function(enteredPassword){
        return await bycrpt.compare(enteredPassword,this.password)
    },
    //Generate JWT 
    getJwtToken: async function(){
        return JWT.sign({
            _id : this._id,
            role:this.role
        },
        config.JWT_SECRET,
        {
            expiresIn:config.JWT_EXPIRY
        })
    },
    generateForgotPasswordToken: function() {
        const FPToken = crypto.randomBytes(20).toString('hex')
        // 1. save to DB
        //crypt that token
        this.forgotPasswordToken = crypto.createHash("sha256").update(FPToken).digest('hex')
        this.forgotPasswordExpiry=Date.now() + 2 * 60 * 1000
        //2. send or return to user
        return FPToken

    }
}

export default mongoose.model("User",userSchema)

//PROTO
//mongoose method
//mongoose hooks