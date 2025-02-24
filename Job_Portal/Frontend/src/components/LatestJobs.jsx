import React from 'react'
<<<<<<< HEAD
import LatestJobCard from './LatestJobCard';

const randomeJobs = [1, 2, 3, 4, 5, 6, 7, 8];
const LatestJobs = () => {
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span>Job Opernings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    randomeJobs.slice(0,6).map((item, index) => <LatestJobCard />)
                }
            </div>
        </div>
    )
=======

const LatestJobs = () => {
  return (
    <div>
      
    </div>
  )
>>>>>>> d98b2bdb78e96ae6e6b0af73975ce6f5ab3993c1
}

export default LatestJobs
