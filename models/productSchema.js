import mongoose from 'mongoose'

const productionSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Required Field"],
            trim:true,
            maxLength:[120,"name should not be more than 120"]
        }    
    },
    {
        timestamps:"true"
    }
)

export default mongoose.model("Product",productionSchema)