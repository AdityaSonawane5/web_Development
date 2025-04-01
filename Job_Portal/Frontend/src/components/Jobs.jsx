import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux';
import store from '@/redux/store';

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
    const {allJobs}=useSelector(store=>store.job);
    console.log(allJobs)
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {   
                        // itha pn allJobs.length yeil pn some resome error yet aaslyane me fakta allJobs 
                        allJobs.length == 0 ? <span>jobs not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pd-5'>
                                <div className='grid grid-cols-3 gap-5'>
                                    {
                                        allJobs.map((job) => (

                                            <Job key={job?._id} job={job} />

                                        ))
                                    }
                                </div>
                            </div>
                        )

                    }
                </div>
            </div>

        </div>
    )
}

export default Jobs
