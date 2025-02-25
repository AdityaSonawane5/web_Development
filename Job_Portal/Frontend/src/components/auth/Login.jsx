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
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import store from '@/redux/store';
import { Loader2 } from 'lucide-react';


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandeler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

  }


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API__END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
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
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <div className="flex justify-center mt-4">
              <Button type="submit" className="w-full bg-[#8e5ee1] hover:bg-[#6b41b3]">Login</Button>
            </div>
          }
          <span className='text-sm'>
            Don't have an account? <Link to="/signup" className='text-blue-600 cursor-pointer'>Sign up</Link>
          </span>

        </form>
      </div>
    </div>
  );
};

export default Login;
