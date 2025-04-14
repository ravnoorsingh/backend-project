// As early as possible in your application, import and configure dotenv:
// require('dotenv').config({path: './env'})

import dotenv from "dotenv"

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";
import connectDB from "./db/index.js";

import { app } from "./app.js";


dotenv.config({
    path: './.env'
})


// "scripts": {
//     "dev": "nodemon src/index.js"
//   },

// "scripts": {
//     "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
//   },

// connectDB() was as asyncronous method, when an asyncronous method, get is loaded , it returns a promise as well 

// app.listen() :- strarting listening to the server (on a port )to grt any data 

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.error("App-level error: ", error);
    });
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port : ${process.env.PORT} `)
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ",err);
})

// connectDB()
// .then(() => {
//     // Handle app-level custom errors (if needed)
//     app.on("error", (error) => {
//         console.error("App-level error: ", error);
//     });

//     // Start the server and handle server-level errors
//     const port = process.env.PORT || 8000;
//     const server = app.listen(port, () => {
//         console.log(`Server is running at port: ${port}`);
//     });

//     server.on("error", (error) => {
//         console.error("Server error: ", error);
//     });
// })
// .catch((err) => {
//     console.error("MONGO db connection failed!!! ", err);
// });




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