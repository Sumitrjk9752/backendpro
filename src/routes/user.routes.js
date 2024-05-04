import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";


const router = Router()

router.route("/register").post(registerUser)


// localhost:8000/users/register
// localhost:8000/login

export default router;