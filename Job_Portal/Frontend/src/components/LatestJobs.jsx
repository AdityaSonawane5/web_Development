import React from 'react';
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
// import store from '@/redux/store';
// const randomeJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    console.log({allJobs})

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>
                <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
            </h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    // allJobs.length  yil allJobs cha jagi pajilya allJobs la 
                    allJobs<=0 ? <span>NO Jobs available</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCard key={job._id} job={job} />
                    )}
            </div>
        </div>
    );
};

export default LatestJobs;
