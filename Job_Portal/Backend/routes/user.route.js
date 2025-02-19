import express from "express"
import { login, logOut, register, updateProfile } from "../Controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenaticated.js";
import { SingleUpload } from "../middlewares/multer.js";

const router=express.Router();

router.route("/register").post(SingleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logOut);
router.route("/profile/update").post(isAuthenticated,updateProfile);

export default router