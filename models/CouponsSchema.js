import mongoose from 'mongoose'

const couponsSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: [true,'Please enter coupon']
        }  ,
        discount:{
            type: Number,
            default: 0
        },
        active:{
            type: Boolean,
            default: true
        }
    },
    {
        timestamps:"true"
    }
)

export default mongoose.model("Coupon",couponsSchema)