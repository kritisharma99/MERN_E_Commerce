import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Required Field"],
            trim:true,
            maxLength:[120,"name should not be more than 120"]
        }  ,
        price:{
            type: Number,
            required:[true, "Required Field"],
            maxLength:[5,"name should not be more than 120"]
        } ,
        description:{
            type: String,
            //Use some type of editors = markdown, for editor npm

        } ,
        photos:[
            {
                secure_url : {
                    type: String,
                    required: true
                }
            }
        ],
        stocks:{
            type: Number,
            default: 0
        },
        sold:{
            type: Number,
            default: 0
        },
        collectionId:{
            type: Schema.Types.ObjectId,
            ref:"Collection"
        }
    },
    {
        timestamps:"true"
    }
)

export default mongoose.model("Product",productSchema)