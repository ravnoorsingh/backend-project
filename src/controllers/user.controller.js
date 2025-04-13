import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req ,res) => {
    // return res.status(200).json({
    //     message: "ok"
    // })
    // Step 1) Get user details from frontend
    // Step 2) Validate user details - Check (Not Empty)
    // Step 3) Check if user already exists - Check using username and email
    // Step 4) Check for images , check for avatar
    // Step 5) Upload them to cloudinary, check if avatar got successfully uploaded to cloudinary
    // -- I got the image back from cloudinary
    // Step 6) Create User Object - Create Entry in DB
    // -- get the response
    // Step 7) Remove password and refresh token field from the response
    // Step 8) Check for user creation - if we got the null resonse from DB or the user got created
    // -- if got the null response then send an error message
    // Step 9) Return the response

    // Step 1) Get user details from frontend
    const {fullname, email, username, password} = req.body
    console.log("email: ", email);

     // Step 2) Validate user details - Check (Not Empty)
    //  if(fullname === ""){
    //     throw new ApiError(400, "Fullname is required")
    //  }
    if(
        [fullname, email, username, password].some((field) =>  field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required");
    }

    // Step 3) Check if user already exists - Check using username and email
    // finding the user in the database having the same username or email
    const existedUser = await User.findOne({
        $or: [
            {username}, {email}
        ]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

     // Step 4) Check for images , check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    // Step 5) Upload them to cloudinary, check if avatar got successfully uploaded to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    //  check if avatar got successfully uploaded to cloudinary
    if(!avatar){
        throw new ApiError(400, "Avatar upload failed")
    }

    // Step 6) Create User Object - Create Entry in DB
    const user = await User.create({
        fullname, 
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

     // Step 9) Return the response
     return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
     )

})  

export {registerUser}