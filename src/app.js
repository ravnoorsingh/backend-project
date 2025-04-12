import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true , limit:"16kb"}))
app.use(express.static("public"))   // for storing public assessts
app.use(cookieParser())


// ⸻

// ✅ app.use(express.json({limit: "16kb"}))
// 	•	Purpose: Parses incoming requests with JSON payloads.
// 	•	limit: "16kb": Restricts the size of incoming JSON request bodies to 16 kilobytes.
// 	•	Helps prevent denial-of-service (DoS) attacks by rejecting excessively large request bodies.

// ⸻

// ✅ app.use(express.urlencoded({ extended: true, limit: "16kb" }))
// 	•	Purpose: Parses incoming requests with URL-encoded payloads, such as data sent via HTML forms.
// 	•	extended: true:
// 	•	Allows parsing of nested objects (uses the qs library instead of the built-in querystring).
// 	•	limit: "16kb":
// 	•	Limits the request body size to 16kb to improve performance and security.

// ⸻

// ✅ app.use(express.static("public"))
// 	•	Purpose: Serves static files (like images, CSS, JavaScript) from the public folder.
// 	•	Example: A request to /logo.png will look for public/logo.png and serve it directly.

// ⸻

// ✅ app.use(cookieParser())
// 	•	Purpose: Parses the Cookie header from incoming requests and makes cookies accessible via req.cookies.
// 	•	Used for handling sessions, authentication tokens, or user preferences.

// ⸻

// Middlewares
/*

When use send a request to s server and the server send a response sometimes you want to check something , that weather the request of a certain kind and then send your or not send your response in that way, middlewares helps you with that, 

eg) 
1) if we only want to send response if the user is logged in
2) if the user is also the admin then send a different response than a normal user

*/

export { app }