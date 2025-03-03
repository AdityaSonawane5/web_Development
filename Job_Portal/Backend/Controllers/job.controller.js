import { Job } from "../Models/job.model.js";


// for admin
// export const postJob=async (req,res)=>{
//     try {
//         const {title,description,requirement,salary,location,jobType,experience,position,companyId}=req.body;
//         const userId=req.id;
//         if(!title || !description || !requirement || !salary || !location || !jobType || !experience || !position || !companyId){
//             return res.status(400).json({
//                 massage:"Somthing is missing ",
//                 success:false
//             })
//         }
//         const job=await Job.create({
//             title,
//             description,
//             requirement:requirement.split(","),
//             salary:Number(salary),
//             location,
//             jobType,
//             experienceLevel:experience,
//             position,
//             company:companyId,
//             created_by:userId
//         })
//         return res.status(201).json({
//             massage:"new jobs created successfully",
//             job,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             success: false
//         });
//     }
// }



export const postJob = async (req, res) => {
    try {
        const { title, description, requirement, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirement || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirement: requirement.split(","), // Ensures array format
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience), // Ensuring it's a number
            position, // Keeping as String
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


// for student
export const getAllJob=async (req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const Jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});

        if(!Jobs){
            return res.status(404).json({
                massage:"Job not found",
                success:false
            }); 
        }
        return res.status(200).json({
            massage:"jobs found",
            Jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


//for student
export const getJobById= async (req,res)=>{
    try {
        const JobId=req.params.id;

        const job=await Job.findById(JobId).populate({
            path:"company"
        }).sort({createdAt:-1});
;

        if(!job){
            return res.status(404).json({
                massage:"Job not found",
                success:false
            }); 
        };
        return res.status(200).json({
            massage:"Job found ",
            job,
            success:true
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

// for admin
export const getAdminJobs=async (req,res)=>{
    try {
        const adminId=req.id;
        const Jobs=await Job.find({created_by:adminId});
        if(!Jobs){
            return res.status(404).json({
                massage:"Job not found",
                success:false
            }); 
        }
        return res.status(200).json({
            massage:"Jobs found",
            Jobs,
            success:true
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}