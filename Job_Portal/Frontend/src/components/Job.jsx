import React from 'react'
import { Button } from './ui/button'
import {Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate=useNavigate()
    // const jobId="mnndknkndjs";
    const daysAgoFuction=(mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime=new Date();
        const timeDifferent=currentTime-createdAt;
        return Math.floor(timeDifferent/(1000*24*60*60));
    }
    return (
        <div className='p-5 rpunded-md shadow-xl bg-white border border-gray-200'>
            <div className='flex items-center justify-between'>
                                                                    {/* iha job.createdAt he yeil fakta job cha yevji  */}
                <p className='text-sm text-gray-500'>{daysAgoFuction(job)==0? "Today": `${daysAgoFuction(job?.createdAt)}days ago `}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>


            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6 " variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa2MIKJFzxdfzDrXwbElUQZnWVxbNiGKAq2g&s' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position}</Badge>
                    <Badge className={"text-[#F83002] font-bold"} variant="ghost">{job?.jobType}</Badge>
                    <Badge className={"text-[#7209b7] font-bold"} variant="ghost">{job?.salary}</Badge>
                </div>
            </div>
            <div className='flex items-center gap-4 m-4'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7] ">save for Later</Button>
            </div>
        </div>
    )
}

export default Job
