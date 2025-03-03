// import { DialogContent,DialogDescription, DialogFooter, DialogTitle } from './ui/dialog';
// import { Dialog, DialogHeader } from './ui/dialog';
// import React, { useState } from 'react';
// import { Label } from './ui/label';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { Loader2 } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// // import store from '../redux/store';
// import axios from 'axios';
// import { USER_API_END_POINT } from '@/utils/constant.js';
// import { setUser } from '@/redux/authSlice.js';
// import { toast } from 'sonner';

// const UpdateProfileDialog = ({ open, setOpen }) => {

//   const [loading, setLoading] = useState(false);
//   const { User } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();

//   const [input, setInput] = useState({
//     fullname: User?.fullname || '',
//     email: User?.email || '',
//     phoneNumber: User?.phoneNumber || '',
//     bio: User?.profile?.bio || '',
//     skills: User?.profile?.skills?.join(', ') || '',
//     file: null,
//   });

//   const ChangeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const FileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   const SubmitHandler = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('fullname', input.fullname);
//     formData.append('email', input.email);
//     formData.append('phoneNumber', input.phoneNumber);
//     formData.append('bio', input.bio);
//     formData.append('skills', input.skills);
//     if (input.file) {
//       formData.append('file', input.file);
//       console.log("no file")
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${USER_API_END_POINT}/profile/update`,
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         dispatch(setUser(res.data.User));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//         console.log('yedzva error')
//       console.log(error);
//       toast.error(error?.response?.data?.message || 'An error occurred');
//     }
//     setLoading(false);
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open}>
//       <DialogContent
//         className="sm:max-w-[425px]"
//         onInteractOutside={() => setOpen(false)}
//       >
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//           <DialogDescription>update profile and resume</DialogDescription>
//         </DialogHeader>
//         <form onSubmit={SubmitHandler}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 value={input.fullname}
//                 onChange={ChangeEventHandler}
//                 type="text"
//                 name="fullname"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 value={input.email}
//                 type="email"
//                 onChange={ChangeEventHandler}
//                 name="email"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="number" className="text-right">
//                 Number
//               </Label>
//               <Input
//                 id="number"
//                 type="tel"
//                 value={input.phoneNumber}
//                 onChange={ChangeEventHandler}
//                 name="phoneNumber"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="bio" className="text-right">
//                 Bio
//               </Label>
//               <textarea
//                 id="bio"
//                 value={input.bio}
//                 onChange={ChangeEventHandler}
//                 name="bio"
//                 className="col-span-3 border rounded-lg p-2"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="skill" className="text-right">
//                 Skills
//               </Label>
//               <Input
//                 id="skill"
//                 type="text"
//                 value={input.skills}
//                 onChange={ChangeEventHandler}
//                 name="skills"
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="file" className="text-right">
//                 Resume
//               </Label>
//               <Input
//                 id="file"
//                 name="file"
//                 type="file"
//                 onChange={FileChangeHandler}
//                 accept="application/pdf"
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             {loading ? (
//               <Button className="w-full my-4" disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please Wait
//               </Button>
//             ) : (
//               <Button type="submit" className="w-full my-4">
//                 Update
//               </Button>
//             )}
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UpdateProfileDialog;



















































































































// import { DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { Dialog, DialogHeader, DialogContent, DialogTitle,DialogDescription, DialogFooter } from './ui/dialog'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading ,setLoading]=useState(false);
  const {user}=useSelector(store=>store.auth);

  const [input,setInput]=useState({
    fullname:user?.fullname,
    email:user?.email,
    phoneNumber:user?.phoneNumber,
    bio:user?.profile?.bio,
    skills:user?.profile?.skills?.map(skill=>skill),
    file:user?.profile?.resume

  });
  const dispatch=useDispatch();

  const changeEventhandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});

  }

  const fileChangeHandler=(e)=>{
    const file=e.target.files?.[0];
    setInput({...input,file})

  }

  const submitHandler=async (e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("bio",input.bio);
    formData.append("skills",input.skills);
    if(input.file){
      formData.append("file",input.file)
    }

    try {
      setLoading(true)
      const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
        headers:{
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true
      })
      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
    setOpen(false)
    setLoading(false)

    console.log(input)

  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=>setOpen(false)}>
          <DialogHeader>
            <DialogTitle>update Profile</DialogTitle>
            <DialogDescription>update prfile and Resume</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className='grid gap py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="fullname" className="text-right">Name</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventhandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventhandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="phoneNumber" className="text-right">Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventhandler}
                  className="col-span-3"
                />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventhandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="skills" className="text-right">Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventhandler}
                  className="col-span-3"
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor="resume" className="text-right">Resume</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {
                loading ?<Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>please wait</Button>:<Button type="submit" className="w-full my-4">Update</Button>
              }
            </DialogFooter>
            {/* <DialogFooter>

            </DialogFooter> */}
          </form>
        </DialogContent>

      </Dialog>

    </div>
  )
}

export default UpdateProfileDialog
















