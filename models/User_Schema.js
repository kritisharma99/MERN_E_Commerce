import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        maxLength:[50,"Name length must be upto 50"]
    }
})