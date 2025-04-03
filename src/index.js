// As early as possible in your application, import and configure dotenv:
// require('dotenv').config({path: './env'})

import dotenv from "dotenv"

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})


// "scripts": {
//     "dev": "nodemon src/index.js"
//   },

// "scripts": {
//     "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
//   },

connectDB();




/*

import express from "express"
const app = express()

// function connectDB(){
    
// }
// connectDB()

// Using IFFE to immediately execute a function
// ; in the start of teh IFFE for cleaning purpose , tp get rid of the situations when in the previous line ; is not there
// 

;( async () => {
    try{
       await mongoose.connect(`${process.env.MONDODB_URI}/${DB_NAME}`)
       app.on("error", (error) => {
            console.log("ERR: ", error);
            throw error
       })

       app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.port}`);
       })

    }catch(error){
        console,error("ERROR: ", error);
        throw error;
    }
})()    

*/