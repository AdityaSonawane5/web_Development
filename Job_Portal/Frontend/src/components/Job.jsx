import React from 'react'
import { Button } from './ui/button'
import {Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'

const Job = () => {
    return (
        <div className='p-5 rpunded-md shadow-xl bg-white border border-gray-200'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" classname="rounded-full" size="icon"><Bookmark /></Button>
            </div>


            <div className='flex items-center gap-2 my-2'>
                <Button classname="p-6 " variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa2MIKJFzxdfzDrXwbElUQZnWVxbNiGKAq2g&s' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Title0</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores architecto dolorum quasi, suscipit voluptate. Nesciunt sapiente eligendi repudiandae molestias sed.</p>
            </div>
            <div>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={"text-blue-700 font-bold"} variant="ghost">12 Positions</Badge>
                    <Badge className={"text-[#F83002] font-bold"} variant="ghost">Part-time</Badge>
                    <Badge className={"text-[#7209b7] font-bold"} variant="ghost">24lpa</Badge>
                </div>
            </div>
            <div className='flex items-center gap-4 m-4'>
                <Button variant="outline">Details</Button>
                <Button className="bg-[#7209b7] ">save for Later</Button>
            </div>
        </div>
    )
}

export default Job
