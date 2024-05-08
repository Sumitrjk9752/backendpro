import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";


const router = Router()

router.route("/register").post(
    upload.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
      {
        name: "coverImage",
        maxCount: 1,
      }
    ]),
    registerUser)
  
  router.route("/login").post(loginUser)
  
  //Secured Routes--
  
  router.route("/logout").post(verifyJWT, logoutUser)
  router.route("/refresh-token").post(refreshAccessToken)




// localhost:8000/users/register
// localhost:8000/login

export default router;