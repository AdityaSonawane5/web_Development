import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'


const randomJobs=[1,2,3]
const Browse = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <h1>search Result ({randomJobs.length})</h1>
        {
            randomJobs.map((item,index)=>{
                return (
                    <div>
                        <Job/>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default Browse
