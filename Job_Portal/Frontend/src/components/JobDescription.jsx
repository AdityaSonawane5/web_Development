import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const JobDescription = () => {
    const isApplied = false;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Fontend Developer</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={"text-blue-700 font-bold"} variant="ghost">12 Positions</Badge>
                        <Badge className={"text-[#F83002] font-bold"} variant="ghost">Part-time</Badge>
                        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">24lpa</Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}>
                    {isApplied ? "Already applied" : "Apply now"}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>Jalgaon</span></h1>
                <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio accusantium, laborum illum omnis repudiandae vero.</span></h1>
                <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>2-4 Year</span></h1>
                <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>3.5-5.5LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicats:<span className='pl-4 font-normal text-gray-800'>100</span></h1>
                <h1 className='font-bold my-1'>Posted Date"<span className='pl-4 font-normal text-gray-800'>25-2-2025</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
