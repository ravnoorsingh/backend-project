import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

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
    const {fullName, email, username, password} = req.body // extracting the data from the request body using destructuring
    console.log("email: ", email);

    // Check after sending this from postman
    // {
    //     "email": "rav@example.com",
    //     "password": ""
    // }

     // Step 2) Validate user details - Check (Not Empty)
    //  if(fullname === ""){
    //     throw new ApiError(400, "Fullname is required")
    //  }
    if(
        [fullName, email, username, password].some((field) =>  field?.trim() === "")
    //     •	.some() is a JavaScript array method that checks if at least one element in the array satisfies the given condition.
	// •	It returns true if the condition is true for any one element, otherwise false.

	// 3.	field?.trim() === "":
	// •	This condition checks:
	// •	If the field is defined (using optional chaining ?.)
	// •	Then uses .trim() to remove leading and trailing whitespace
	// •	Compares it to an empty string (””)
	// •	If a field is missing (undefined or null) or only contains whitespace ("   "), it will be considered invalid.
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

    /*
    •	User.findOne(...): This is a MongoDB query using Mongoose that searches for a single user in the database.
	•	$or: A MongoDB operator used to match either of the conditions provided inside the array.

    Here:
	•	{username} is shorthand for {username: username} — it checks for a user with that username.
	•	{email} checks for a user with that email.

    So, this query returns the first user it finds that matches either the provided username or email.
    */

     // For Curiosity: console.log(existedUser)
     console.log(existedUser)

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    // Just as req.body is given by express to get the data from the request body
    // req.files is given by multer to get the files from the request
    // req.files is an object that contains the files uploaded in the request
    // middleware like multer usually add more filds to the request(req object)

    // Step 4) Check for images , check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    // check if coverImage is not an array or empty

    /*
    •	req.files: This object is provided by the Multer middleware, which handles file uploads in Express.
	•	avatar and coverImage: These are keys used in the frontend FormData when uploading files.
	•	req.files?.avatar[0]?.path:
	•	?. is optional chaining to safely access nested properties.
	•	This extracts the path of the first avatar image file (usually a local temporary path where Multer saved it before Cloudinary upload).
    */

    // For Curiosity: console.log(req.files)
    console.log(req.files)

    // check for avatar
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
        fullName, 
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    /*
    🔍 Explanation of Each Field:
	1.	fullname
    This is directly taken from req.body.fullname. It stores the full name of the user.
	2.	avatar: avatar.url
	•	avatar is the Cloudinary response after uploading the image.
	•	avatar.url is the direct URL to the uploaded image on Cloudinary.
	•	This value is stored in the database so the frontend can fetch and show the avatar.
	3.	coverImage: coverImage?.url || ""
	•	Optional chaining coverImage?.url checks if the cover image exists and was uploaded.
	•	If it wasn’t uploaded (undefined or null), it defaults to an empty string "".
	•	This prevents errors when no cover image is provided.
	4.	email
    Taken directly from req.body.email. Used to identify and contact the user.
	5.	password
    Taken from req.body.password. Usually it should be hashed before saving (if not done elsewhere), to prevent storing plaintext passwords.
	6.	username: username.toLowerCase()
    Converts the username to lowercase before saving it in the database. This avoids issues with case sensitivity (e.g., John vs john).

⸻

    📦 await User.create({...})
	•	This is a Mongoose method that:
	•	Validates the data (based on your Mongoose schema)
	•	Creates and saves the new document to the users collection in MongoDB
	•	Returns the newly created document (user)

⸻

     */

    // Step 7) Remove password and refresh token field from the response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    /*
    ✅ User.findById(user._id)
	•	This uses Mongoose to find a user in the MongoDB collection by their _id.
	•	user._id comes from the result of User.create(...) earlier in the code.
	•	So, you’re fetching the same user you just created, but this time you’re going to modify what gets selected.

    ✅ .select("-password -refreshToken")
	•	The .select() method in Mongoose lets you specify which fields to include or exclude in the result.
	•	Prefixing a field name with - means exclude it.
	•	So here you’re telling Mongoose:
    “Return the user document, but exclude the password and refreshToken fields.”

    ✅ Why exclude these?
	•	Security reasons:
	•	Never send passwords (even hashed) back to the frontend.
	•	refreshToken is sensitive and should only be used internally for managing authentication.

⸻

    🧠 Why retrieve the user again?

    Even though user already contains the data returned from User.create(...), it might include fields like password and refreshToken, which you don’t want to expose in your API response. So you make another query with .select() to clean the response. 
    */

    // Step 8) Check for user creation - if we got the null resonse from DB or the user got created
    // -- if got the null response then send an error message
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

     // Step 9) Return the response
     return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
     )

     /*
     ✅ Here’s what’s happening:
	•	res.status(201) sets the HTTP response status code to 201 Created.
	•	.json(...) sends a JSON response to the client (typically your frontend or Postman or wherever the API was called).
	•	Inside .json(...), you’re creating a new ApiResponse object — which likely looks like a structured format you’ve defined for consistent responses.

⸻

    🔍 So, where does it go?

    This JSON response goes back to the client that made the request — that is:
	•	If you’re testing via Postman, it’ll appear in the response window there.
	•	If you’re using frontend code (like React/Next.js) to make a request using fetch or axios, the response will be received in .then(res => ...) or await fetch(...).
    */

})  

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        // Fetch the user by ID
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Assign the refresh token to the user
        user.refreshToken = refreshToken;

        // Save the user without validation
        await user.save({ validateBeforeSave: false });

        // Return the tokens
        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
    }
};
const loginUser = asyncHandler(async (req, res) => {
    // Step 1) Get the data form req.body
    // Step 2) Login the user using their username or email
    // Step 3) Find the user in the database
    // Step 4) Check if the user is found , if not then send an error
    // Step 5) If user is found then check if the password is correct
    // Step 6) If password is correct then generate the access token and refresh token and send both of them to user
    // Step 7) Send the tokens to cookies
    // Step 8) Send the response to the user about successful login


    // Step 1) Get the data form req.body
    const {username, email, password} = req.body;

    // if the user or email is not provided then send an error
    if(!username && !email){
        throw new ApiError(400, "Username or email is required")
    }

    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }


    // Step 3) Find the user in the database
    // using the or operator to find the user in the database on the basis of username or email
    const user = await User.findOne({
        $or: [
            {username}, 
            {email}
        ]
    })

    // Step 4) Check if the user is found , if not then send an error
    // if user is not found then send an error
    if(!user){
        throw new ApiError(404, "Invalid credentials")
    }

    // Step 5) If user is found then check if the password is correct
    const isPasswordVaild = await user.isPasswordCorrect(password);

    if(!isPasswordVaild){
        throw new ApiError(401, "Invalid user credentials")
    }

    // Step 6) If password is correct then generate the access token and refresh token and send both of them to user

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser  = await User.findById(user._id).select("-password -refreshToken")


     // Step 7) Send the tokens to cookies
    // making httpOnly and secure true make sure that the cookies can only be modified at the server side, and clients can only read them 
    const options = {
        httpOnly: true,
        secure: true,
    }
                               
    // .cookie("key", "value", options)
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in Successfully"
            )
        )
})

const logoutUser = asyncHandler(async(req, res) => {
    // Step 1) Removing the cookies
    // Step 2) Removing the refresh Token

    // Step 1) Removing the cookies
    // Here we dont have access to the user so how do we log it out, we cant ask user to type it's email on logout to get the reference of User
    // Adding our own authorisation middleware to get the reference of the user
    await User.findByIdAndUpdate(
        req.user._id, 
        {
            // $set: {
            //     refreshToken: undefined
            // }
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new : true
        }
    )
    const options = {
        httpOnly: true, 
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        )
})

// const refreshAccessToken = asyncHandler( async(req, res) => {
//     // Step 1) Get the refresh token from cookies
//     // Step 2) Check if the refresh token is present
//     // Step 3) Verify the refresh token
//     // Step 4) Generate new access token and refresh token
//     // Step 5) Send the tokens to cookies
//     // Step 6) Send the response to the user about successful login

//     // Step 1) Get the refresh token from cookies
//     const {refreshToken} = req.cookies;

//     // Step 2) Check if the refresh token is present
//     if(!refreshToken){
//         throw new ApiError(400, "Refresh token is required")
//     }

//     // Step 3) Verify the refresh token
//     let decodedToken;
//     try {
//         decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
//         console.log("decodedToken: ", decodedToken);
        
//     } catch (error) {
//         throw new ApiError(401, "Invalid refresh token")
//     }

//     // Step 4) Generate new access token and refresh token
//     const {accessToken, refreshToken: newRefreshToken} = await generateAccessAndRefreshTokens(decodedToken._id)

//      // Step 5) Send the tokens to cookies
//      const options = {
//         httpOnly: true,
//         secure: true,
//      }

//      return res
//         .status(200)
//         .cookie("accessToken", accessToken, options)
//         .cookie("refreshToken", newRefreshToken, options)
//         .json(
//             new ApiResponse(
//                 200,
//                 {},
//                 "New access and refresh tokens generated successfully"
//             )
//         )
// })

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(400, "Refresh token is required");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken, 
            process.env.REFRESH_TOKEN_SECRET,
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true, 
            secure: true
        }
    
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)
    
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {accessToken, refreshToken: newRefreshToken},
                    "Access token refreshed successfully"
                )
            )
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body

    // const {oldPassword, newPassword, confPassword} = req.body

    // if(!(newPassword === confPassword)){
    //     throw new ApiError(400, "New password and confirm password do not match")
    // }

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Old password")
    }

    user.password = newPassword
    await user.save({
        validateBeforeSave: false
    })

    return res.status(200).json({
        message: "Password changed successfully"
    })
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.user, "Current user fetched successfully")
    )
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    // const {fullName, username} = req.body

    // // Check if the user is trying to update the username
    // if(username){
    //     const existedUser = await User.findOne({
    //         username,
    //         _id: {$ne: req.user._id}
    //     })

    //     if(existedUser){
    //         throw new ApiError(409, "Username already exists")
    //     }
    // }

    // // Update the user details
    // const updatedUser = await User.findByIdAndUpdate(
    //     req.user._id,
    //     {
    //         fullName,
    //         username
    //     },
    //     {
    //         new: true,
    //         runValidators: true
    //     }
    // )

    // return res.status(200).json(
    //     new ApiResponse(
    //         200,
    //         updatedUser,
    //         "Account details updated successfully"
    //     )
    // )

    const { fullName, email } = req.body;
    if(!fullName || !email){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName: fullName,
                email: email
            }
        },
        {new : true}
    ).select("-password")

    return res.status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})

// Updation of files
// step 1) Using multer middleware to accept the files -- middlware 1
// step 2) Only those users are allowed to update their files who are logged in -- middlware 2

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path  // got this using multer middleware
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar.url){
        throw new ApiError(400, "Error while uploading avatar")
    }

    // const user = await User.findById(req.user?._id);
    // user.avatar = avatar.url;
    // await user.save();

    // return res.status(200).json({
    //     message: "Avatar updated successfully",
    //     avatar: user.avatar
    // });
    
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {new : true},
    ).select("-password")
})

// const updateUserCoverImage = asyncHandler(async (req, res) => {
//     const coverImageLocalPath = req.file?.path
//     if(!coverImageLocalPath){
//         throw new ApiError(400, "Cover image file is required")
//     }

//      //TODO: delete old image - assignment

//     const coverImage = await uploadOnCloudinary(coverImageLocalPath)

//     if(!coverImage.url){
//         throw new ApiError(400, "Error while uploading cover image")
//     }

//     const user = await User.findByIdAndUpdate(
//         req.user?._id,
//         {
//             $set: {
//                 coverImage: coverImage.url
//             }
//         },
//         {new : true}
//     ).select("-password")

//     return res
//     .status(200) 
//     .json(
//         new ApiResponse(
//             200,
//             user, 
//             "Cover Image updated successfully"
//         )
//     )

// })

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is required");
    }

    // Step 1: Fetch the user's current cover image
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const oldCoverImageUrl = user.coverImage;

    // Step 2: Delete the old image from Cloudinary (if it exists)
    if (oldCoverImageUrl) {
        const publicId = oldCoverImageUrl.split("/").pop().split(".")[0];
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.error("Error deleting old cover image:", error);
            throw new ApiError(500, "Error while deleting old cover image");
        }
    }

    // Step 3: Upload the new cover image to Cloudinary
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading cover image");
    }

    // Step 4: Update the user's cover image in the database
    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url,
            },
        },
        { new: true }
    ).select("-password");

    // Step 5: Return the response
    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Cover Image updated successfully")
    );
});

const getUserChannelProfile = asyncHandler(async(req, res) => {
    const {username} = req.updateUserCoverImage
    if(!username?.trim()){
        throw new ApiError(400, "Username is missing")
    }

    // User.find({username})
    const channel = await User.aggregate([
        {
            $match: {       // 
                username: username?.toLowerCase()
            }
            // Matches a document in the User collection where the username field matches the input (converted to lowercase for consistency).

        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
            // •	Joins with the subscriptions collection.
            // •	Finds all users who have subscribed to this user (channel).
            // •	channel is a field in the subscriptions collection, which refers to the user being subscribed to.
            // •	The matched documents are added in an array field called subscribers.
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }

            // •	Again joins with subscriptions.
            // •	This time, it finds all channels that this user is subscribed to.
            // •	subscriber refers to the user who subscribes to others.
            // •	Resulting array is stored as subscribedTo.
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in : [req.user._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }

        // 1.	subscribersCount: Count the number of subscribers by taking the size of the subscribers array.
	    // 2.	channelsSubscribedToCount: Count of channels the user is subscribed to.
	    // 3.	isSubscribed: Checks whether the current logged-in user (req.user._id) is in the subscribers list.
	    // •	It checks if req.user._id exists inside the list of subscriber fields in subscribers.
	    // •	Sets isSubscribed to true or false.
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1,
                // createdAt: 1,
            }
            // 	•	Only returns the necessary fields to the client.
        }
    ])

    if(!channel.length){
        throw new ApiError(404, "channel does not exist")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            channel[0],
            "User channel profile fetched successfully"
        )
    )
})

const getWatchHistory = asyncHandler(async(req, res) => {
    // req.user._id :- Here we are getting a string of user id which mongoose is converting to ObjectId to match with the id in the database in MongoDB 
    const user = await User.aggregate([
        {
            $match: {
                // _id: req.user._id // here mongoose doesn't work , In aggregation pipelines the _id gets directly transformed to database
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [ // adding a nested pipeline to the lookup owners and adding the owner details
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                    
                ]
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0]?.watchHistory,
            "User watch history fetched successfully"
        )
    )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
}