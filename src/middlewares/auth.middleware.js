// This middleware will only check if User exists or not

import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { jwt } from "jsonwebtoken";
import { User } from "../models/user.model";
// we will check if the user has the correct access and refresh token , if so we will add a new field to the request object called user (req.user) 

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // If cookies does not have accessToken then check the header for Authorization
        /*
            Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:
            Authorization: Bearer <token>
            source : https://jwt.io/introduction
        */
       if(!token){
        throw new ApiError(401, "Unauthorized request") 
       }
    
       // If we get the token then we will verify it using it using jwt
       const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
       const user = await User.findById(decodedToken?._id).
       select("-password -refreshToken")
    
       if(!user){
        // TODO: discuss about frontend
        throw new ApiError(401, "Invalid Access Token")
       }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}) 