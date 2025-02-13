import express from "express"
import { login, logOut, register, updateProfile } from "../Controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenaticated.js";

const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logOut);
router.route("/profile/update").post(isAuthenticated,updateProfile);

export default router