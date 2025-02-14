import express from "express"
import { getAdminJobs, getAllJob, getJobById, postJob } from "../Controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenaticated.js";

const router=express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJob);
router.route("/getadminjobs").get(isAuthenticated,getJobById);
router.route("/get/:id").post(isAuthenticated,getAdminJobs);

export default router;