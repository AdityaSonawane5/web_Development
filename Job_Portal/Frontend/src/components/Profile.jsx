import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
// import store from '@/redux/store'

// const skills = ["html", "css", "javascript", "react"]
// const isResume = true
const Profile = () => {
  const [open,setOpen]=useState(false);
  const {User}=useSelector(store=>store.auth);

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between '>
          <div className='flex items-center gap-4'>
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa2MIKJFzxdfzDrXwbElUQZnWVxbNiGKAq2g&s" alt="profile" />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{User?.fullname}</h1>
              <p>{User?.profile?.bio} </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right " variant="outline"><Pen></Pen></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{User?.email}</span>
          </div>

          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{User?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>
            {
              User?.profile?.skills.length != 0 ? User?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>no skills</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>
          {
            User?.profile?.resumeOriginalName ? <a target='blank' href='https://youtube.com' className='text-blue-500 w-full hover:underline cursor-pointer'>{User?.profile?.resumeOriginalName}</a> : <span>No Resume</span>
          }
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5 '>Applied jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
