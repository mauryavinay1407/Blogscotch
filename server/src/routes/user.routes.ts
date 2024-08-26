import { Router } from "express";
import { upload } from "../Services/MulterConfig";
import { logoutUser, signinUser, signupUser, updateUser } from "../controllers/user.controller";
import  {verifyJWT} from "../middlewares/auth.middleware"

const router=Router();

router.post("/signup",upload.single("profile"),signupUser);
router.post("/signin",signinUser);
router.get("/logout",verifyJWT,logoutUser)
router.put("/me",upload.single("profile"),verifyJWT,updateUser)

export {router as userRouter}