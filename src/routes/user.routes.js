import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
// http://localhost:8000/users/register :- got to thsis file "../controllers/user.controller.js"


export default router;