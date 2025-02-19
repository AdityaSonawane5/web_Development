import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API__END_POINT } from '@/utils/constant';
import { toast } from 'sonner';


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })
  const navigate = useNavigate();

  const changeEventHandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API__END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }

  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10 space-y-4">
          <h1 className="font-bold text-xl mb-5 text-center">Log in</h1>

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
                  checked={input.role === "student"}
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
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandeler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-center mt-4">
            <Button type="submit" className="w-full bg-[#8e5ee1] hover:bg-[#6b41b3]">Login</Button>
          </div>
          <span className='text-sm'>
            Don't have an account? <Link to="/signup" className='text-blue-600 cursor-pointer'>Sign up</Link>
          </span>

        </form>
      </div>
    </div>
  );
};

export default Login;
