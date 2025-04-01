import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Mumbai", "Banglore", "Pune", "Hyderabad"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lack", "1lack-5lack"]
    }
];

const FilterCard = () => {
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {data.array.map((item, subIndex) => (
                            <div key={subIndex} className='flex items-center space-x-2 my-2'>
                                <RadioGroupItem value={item} />
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
