import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Signup = () => {
      const [input ,setInput]=useState({
          fullname:"",
          email:"",
          phoneNumber:"",
          password:"",
          role:"",
          file:"",
      })
  
      const changeEventHandeler=(e)=>{
          setInput({...input,[e.target.name]:e.target.value});
      }
  
      const changeFilehandler=(e)=>{
          setInput({...input,file:e.target.files?.[0]});
      }

      const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
    };
    
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10 space-y-4">
          <h1 className="font-bold text-xl mb-5 text-center">Signup</h1>

          <div>
            <Label>Full Name</Label>
            <Input
             type="text"
              placeholder="Enter your name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandeler}
              required
              />
          </div>

          <div>
            <Label>Email</Label>
            <Input 
            type="email" 
            placeholder="Enter your Email"
            value={input.email}
              name="email"
              onChange={changeEventHandeler}
             required />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
             type="tel"
              placeholder="Enter your Phone Number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandeler}
             required />
          </div>

          <div>
            <Label>Password</Label>
            <Input
             type="password" 
             placeholder="Enter Password" 
             value={input.password}
              name="password"
              onChange={changeEventHandeler}
             required />
          </div>

          <div className="flex items-center justify-center">
            <RadioGroup defaultValue="student" className="flex gap-4">
              <div className="flex items-center space-x-2">
                {/* <RadioGroupItem value="student" id="student" /> */}
                <Input type="radio"
                  name="role"
                  value="student"
                  checked={input.role==="student"}
                  onChange={changeEventHandeler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                {/* <RadioGroupItem value="recruiter" id="recruiter" /> */}
                <Input type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role==="recruiter"}
                  onChange={changeEventHandeler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFilehandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button type="submit" className="w-full bg-[#8e5ee1] hover:bg-[#6b41b3]">Signup</Button>
          </div>
          <span className='text-sm'>
            Already have an account? <Link to="/login" className='text-blue-600 cursor-pointer'>Login</Link>
          </span>

        </form>
      </div>
    </div>
  );
};

export default Signup;
