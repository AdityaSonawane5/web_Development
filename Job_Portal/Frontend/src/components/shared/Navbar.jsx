import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
    // const user = true; // Change to true for testing logged-in state
    const { User } = useSelector(store => store.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logoutHandler= async ()=>{
        try {
            const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
            if(res.data.success){
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

    }
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                <h1 className="text-2xl font-bold">
                    Job<span className="text-[#F83002]">Portal</span>
                </h1>
                <div className="flex items-center gap-10">
                    <ul className="flex font-medium items-center gap-5">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>

                    {
                        !User ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#8e5ee1] hover:bg-[#6b41b3]" variant="outline">Sign Up</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={User?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-4 rounded-md shadow-lg bg-white">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={User?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <h4 className="font-medium text-sm">{User?.fullname}</h4>
                                            <span className="text-xs text-gray-500">{User?.email}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 border-t pt-2 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <User2 className="w-4 h-4 text-gray-600" />
                                            <Button variant="link" className="w-full text-sm text-gray-700"><Link to="/profile">View Profile</Link></Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <LogOut className="w-4 h-4 text-gray-600" />
                                            <Button onClick={logoutHandler} variant="link" className="w-full text-sm text-gray-700">Log Out</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
