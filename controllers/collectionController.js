import Collection from "../models/Collection_Schema"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"


export const createCollection=asyncHandler(async(req,res)=>{
    const {name} =req.body
//take name from frontend
    if(!name){
        throw new CustomError("Collection name is required",400)

    }

    //send it to database
    const collection = await Collection.create({
        name
    })
    //sen d this respomse to frontend
    res.send(200).json({
        success:true,
        collection
    })
})

/*********************************************
 * @updateCollection 
 * @route 
 * @description
 * @parameters
 * @returns
 ********************************************/

 export const updateCollection=asyncHandler(async(req,res)=>{
    //existing value to be updated
    const {id:collectionId}=req.params

    //New value
    const {name} = req.body

    let updatedCollectn = await Collection.findByIdAndUpdate(collectionId,{name},{new : true, runValidators:true,})

    if(!updatedCollectn){
        throw new CustomError("Collection not found",400)
    }
    //send reponse to frontend
    res.status(200).json({
        success:true,
        message:"updated!",
        updatedCollectn
    })
})

export const deleteCollection=asyncHandler(async(req,res)=>{
    const {id:collectionId}=req.params

    //New value
    const {name} = req.body

    let deletedCollectn = await Collection.findByIdAndDelete(collectionId)

    if(!deletedCollectn){
        throw new CustomError("Collection not found",404)
    }

    deleteCollection.remove()
    //send reponse to frontend
    res.status(200).json({
        success:true,
        message:"updated!",
        deletedCollectn
    })
})



//List of collection

export const getAllCollections = asyncHandler(async(req,res)=>{
    await Collection.find()

    if(!getAllCollections){
        throw new CustomError("No Collection found")
    }
    res.status(200).json({
        success:true,
        message:"updated!",
        getAllCollections
    })

})