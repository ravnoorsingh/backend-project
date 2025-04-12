import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`) 
        // connectionInstance.connection.host :- to get to know which host we are connecting to
        // console.log(connectionInstance); :- try this important Stuff
        
    } catch (error) {
        console.log("MONGODB connection FAILED", error);
        process.exit(1);
    }
}

export default connectDB

// process in NOdeJs gives us the reference of the process on which our project is running