import React, { use, useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
// import usegetSingleJob from '@/Hooks/usegetSingleJob';
import axios from 'axios';
import { APPLICATION_JOB_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'lucide-react';
// import store from '@/redux/store';
import { toast } from 'sonner';

const JobDescription = () => {
    const isIntiallyApplied = singleJob?.applications?.some(application=>application.applicant==User?._id)|| false;
    const params = useParams();
    const jobId = params.id;
    const [isApplied,setIsApplied]=useState(isIntiallyApplied);

    // usegetSingleJob(jobId);
    const {singleJob}=useSelector(store=>store.job);
    const dispach=useDispatch();
    const {User}=useSelector(store=>store.auth);


    const applyJobHandler= async ()=>{
        try {
            const res =axios.get(`${APPLICATION_JOB_END_POINT}/apply/${jobId}`,{withCredentials:true});
            if(res.data.success){
                setIsApplied(true)
                const updateSingleJob={...singleJob,application:[...singleJob.application,{applicant:User?._id}]}
                dispach(singleJob(updateSingleJob));

                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }



    useEffect(() => {
        const fechSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispach(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.application.some(application=>application.applicant==User?._id))
                }
            } catch (error) {
                console.log(error);

            }
        }
        fechSingleJobs()
    }, [jobId,dispach,User?._id]);


    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={"text-blue-700 font-bold"} variant="ghost">{singleJob?.position}</Badge>
                        <Badge className={"text-[#F83002] font-bold"} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">{singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied?null:applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}>
                    {isApplied ? "Already applied" : "Apply now"}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>Jalgaon</span></h1>
                <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{job?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
                <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Total Applicats:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications}</span></h1>
                <h1 className='font-bold my-1'>Posted Date"<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
