import {Router} from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";

const router = Router()

//router.route("/register").post(registerUser)
// http://localhost:8000/users/register :- got to thsis file "../controllers/user.controller.js"

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),registerUser
)

router.route("/login").post(loginUser)

// verify login using auth middleware
// secred routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)



export default router;

// https://chatgpt.com/share/67fccfe6-556c-800c-a457-6c4a7b6115c4