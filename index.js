import mongoose from "mongoose";
import app from "./app";
import config from "./config/index"

//try to connect database
//different way : using IIFE ==> (async()=>{})()
//previously, we create a function then run that

(async()=>{
    try{
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB Connect!!")

        app.on('error',(err)=>{
            console.log(err);
            throw err
        })
        const onListening =()=>{
            console.log("listening to this :",config.PORT)
        }
        app.listen(config.PORT,onListening)

        // app.listen(config.PORT,()=>{
        //     console.log("listening to this :",config.PORT)
        // })
    }
    catch(error){
        console.log("ERR :", error)
        throw err
    }
})()

