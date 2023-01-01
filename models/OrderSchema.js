import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
    {
        product:{
            type:[
                {
                    productId:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref:Product,
                        required:true
                    },
                    count: Number,
                    price: Number

                }
            ],
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        },
        address:{
            type:Number,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        coupon:String,
        transactionID: String,
        status:{
            type:String,
            enum:["ORDERED","SHIPPED","DELIVERED","CANCELLED"],
            default:"ORDERED"
            //can we improve this

        },
        //payment mode : UPI, cod etc

    },
    {
        timestamps:"true"
    }
)

export default mongoose.model("Order",orderSchema)