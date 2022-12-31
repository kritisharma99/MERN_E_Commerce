import mongoose from 'mongoose'

const collectionSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Required Field"],
            trim:true,
            maxLength:[120,"Collection name should not be more than 120"]
        }    
    },
    {
        timestamps:"true"
    }
)

export default mongoose.model("Callection",collectionSchema)