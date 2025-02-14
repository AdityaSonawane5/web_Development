import { Application } from "../Models/application.model.js";
import { Job } from "../Models/job.model.js";

export const applyJob= async (req,res)=>{
    try {
        const userId=req.userId;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                massage:"Job ID is required",
                success:false
            })
        }
        // check if user has already applyed for this job
        const existingApplication= await Application.findOne({job:jobId,applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                massage:"you already apply for this job application.",
                success:false
            })
        }
        // check if job exists
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                massage:"Job not found",
                success:false
            })
        }
        // create new application
        const newApplication= await Application.create({
            job:jobId,
            applicant:userId
        })

        job.application.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            massage:"Job applied succesfully",
            success:true
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
             success: false
        });
    };
};


export const getAppliedJobs= async (req,res)=>{
    try {
        const userId=req.params.id;
        const application= await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            option:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                option:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                massage:"No Appliction",
                success:false
            })
        } 
        return res.status(201).json({
            massage:"",
            application,
            success:true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
             success: false
        });
    }
}

// admin can see how many user appliced
export const getApplicants = async (req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"application",
            option:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        });
        if(!job){
            return res.status(404).json({
                massage:"Job not Found",
                success:false
            })
        }
        return res.status(201).json({
            massage:"",
            job,
            success:true
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
             success: false
        });
    }
}


export const updateStates= async (req,res)=>{
    try {
        const {status}=req.body;
        const appliationId=req.params.id;
        if(!status){
            return res.status(404).json({
                massage:"Status not required",
                success:false
            })
        }
        // find the application by applicant id
        const appliation= await Application.findOne({_id:appliationId});
        if(!appliation){
            return res.status(404).json({
                massage:"Application not Found",
                success:false
            })
        }
        //update the states
        application.status=status.toLowerCase();
        await appliation.save();

        return res.status(200).json({
            massage:"Update states sucessfully",
            success:true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             success: false
        });
    }
}