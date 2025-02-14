import express from "express"
import { applyJob, getApplicants, getAppliedJobs, updateStates } from "../Controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenaticated.js";

const router=express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/states/:id/update").post(isAuthenticated,updateStates);

 


export default router;