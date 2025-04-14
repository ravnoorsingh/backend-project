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

export {registerUser}