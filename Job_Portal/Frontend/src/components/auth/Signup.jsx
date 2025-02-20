import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API__END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';


const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  })
  const {loading}=useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const navigate = useNavigate();


  const changeEventHandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file)
      formData.append("file", input.file)
    // USER_API__END_POINT
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API__END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);

      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)

    } finally{
      dispatch(setLoading(false));
    }
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
            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFilehandler}
                className="cursor-pointer"
              />
            </div>
            {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <div className="flex justify-center mt-4">
              <Button type="submit" className="w-full bg-[#8e5ee1] hover:bg-[#6b41b3]">sign up</Button>
            </div>
          }
          </div>
          {/* <div className="flex justify-center mt-4">
            <Button type="submit" className="w-full bg-[#8e5ee1] hover:bg-[#6b41b3]">Signup</Button>
          </div> */}
          <span className='text-sm'>
            Already have an account? <Link to="/login" className='text-blue-600 cursor-pointer'>Login</Link>
          </span>

        </form>
      </div>
    </div>
  );
};

export default Signup;
