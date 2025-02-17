// import { Application } from "../Models/application.model.js";
// import { Job } from "../Models/job.model.js";

// export const applyJob= async (req,res)=>{
//     try {
//         const userId=req.userId;
//         const jobId=req.params.id;
//         if(!jobId){
//             return res.status(400).json({
//                 massage:"Job ID is required",
//                 success:false
//             })
//         }
//         // check if user has already applyed for this job
//         const existingApplication= await Application.findOne({job:jobId,applicant:userId});
//         if(existingApplication){
//             return res.status(400).json({
//                 massage:"you already apply for this job application.",
//                 success:false
//             })
//         }
//         // check if job exists
//         const job=await Job.findById(jobId);
//         if(!job){
//             return res.status(404).json({
//                 massage:"Job not found",
//                 success:false
//             })
//         }
//         // create new application
//         const newApplication= await Application.create({
//             job:jobId,
//             applicant:userId
//         })

//         job.applications.push(newApplication._id);
//         await job.save();
//         return res.status(201).json({
//             massage:"Job applied succesfully",
//             success:true
//         })

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Internal Server Error ok samaj gya",
//              success: false
//         });
//     };
// };


// export const getAppliedJobs= async (req,res)=>{
//     try {
//         const userId=req.params.id;
//         const application= await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
//             path:"job",
//             options:{sort:{createdAt:-1}},
//             populate:{
//                 path:"company",
//                 option:{sort:{createdAt:-1}},
//             }
//         });
//         if(!application){
//             return res.status(404).json({
//                 massage:"No Appliction",
//                 success:false
//             })
//         } 
//         return res.status(201).json({
//             massage:"",
//             application,
//             success:true
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Internal Server Error",
//              success: false
//         });
//     }
// }

// // admin can see how many user appliced
// export const getApplicants = async (req,res)=>{
//     try {
//         const jobId=req.params.id;
//         const job=await Job.findById(jobId).populate({
//             path:"applications",
//             option:{sort:{createdAt:-1}},
//             populate:{
//                 path:"applicant"
//             }
//         });
//         if(!job){
//             return res.status(404).json({
//                 massage:"Job not Found",
//                 success:false
//             })
//         }
//         return res.status(201).json({
//             massage:"",
//             job,
//             success:true
//         })

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Internal Server Error",
//              success: false
//         });
//     }
// }


// export const updateStatus= async (req,res)=>{
//     try {
//         const {status}=req.body;
//         const appliationId=req.params.id;
//         if(!status){
//             return res.status(404).json({
//                 massage:"Status not required",
//                 success:false
//             })
//         }
//         // find the application by applicant id
//         const appliation= await Application.findOne({_id:appliationId});
//         if(!appliation){
//             return res.status(404).json({
//                 massage:"Application not Found",
//                 success:false
//             })
//         }
//         //update the states
//         application.status=status.toLowerCase();
//         await appliation.save();

//         return res.status(200).json({
//             massage:"Update states sucessfully",
//             success:true
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Internal Server Error",
//              success: false
//         });
//     }
// }















































// chatgpt code
import { Application } from "../Models/application.model.js";
import { Job } from "../Models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }
        
        // Check if user has already applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }
        
        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        
        // Create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.params.id;
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    options: { sort: { createdAt: -1 } },
                }
            });
        
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Applications retrieved successfully",
            applications,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// Admin can see how many users applied
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        });
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Applicants retrieved successfully",
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }
        
        // Find the application by ID
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }
        
        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
