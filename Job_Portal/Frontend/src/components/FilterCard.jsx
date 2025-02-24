import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const filterData = [
    {
        filterType: "Location",
        array: ["delhi", "mumbai", "banglore", "pune", "hyderabad"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lack", "1lack-5lack"]
    }
]
const FilterCard = () => {
    return (
        <div>
            <h1>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1>{data.filterType}</h1>
                            {
                                data.array.map((item,index)=>{
                                    return(
                                        <div>
                                            <RadioGroupItem value={item} />
                                            <label>{item}</label>
                                        </div>
                                    )}
                                )
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
