import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

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

export default router;

// https://chatgpt.com/share/67fccfe6-556c-800c-a457-6c4a7b6115c4