import {Router} from "express";
import { 
    changeCurrentPassword, 
    getCurrentUser, 
    loginUser, 
    logoutUser, 
    registerUser, 
    updateAccountDetails ,
    refreshAccessToken, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory 
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


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
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser )
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.rooute("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)



export default router;

// https://chatgpt.com/share/67fccfe6-556c-800c-a457-6c4a7b6115c4