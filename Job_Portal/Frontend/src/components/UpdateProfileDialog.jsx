// import { DialogContent, DialogFooter, DialogTitle } from './ui/dialog'
// import { Dialog, DialogHeader } from './ui/dialog'
// import React, { useState } from 'react'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Loader2 } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import store from '@/redux/store'
// import axios from 'axios'
// import { USER_API__END_POINT } from '@/utils/constant'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'

// const UpdateProfileDialog = ({ open, setOpen }) => {
//     const [Loading,setLoading]=useState(false)
//     const {User}=useSelector(store=>store.auth);

//     const [input,setInput]=useState({
//         fullname:User?.fullname,
//         email:User?.email,
//         phoneNumber:User?.phoneNumber,
//         bio:User?.profile?.bio,
//         skills:User?.profile?.skills?.map(skill=>skill),
//         file:User?.profile?.resume

//     });
//     const dispach=useDispatch();
//     const ChangeEventHandler=(e)=>{
//         setInput({...input,[e.target.name]:e.target.value})
//     }


//     const FileChangeHandler=(e)=>{
//         // setInput({...input,file:e.target.files[0]})
//         const file=e.target.files?.[0];
//         setInput({...input,file})
//     }
//     const SubmitHandler= async (e)=>{
//         e.preventDefault();
//         const fromData=new FormData();
//         fromData.append('fullname',input.fullname)
//         fromData.append('email',input.email)
//         fromData.append('PhoneNumber',input.phoneNumber)
//         fromData.append('bio',input.bio)
//         fromData.append('skills',input.skills)
//         if(input.file){
//             fromData.append("file",input.file);
//         }
//         try {
//             const res =await axios.post(`${USER_API__END_POINT}/profile/update`,fromData,{
//                 headers:{
//                     'Content-Type':'multipart/form-data'
//                 },
//                 withCredentials:true
//             });
//             if(res.data.success){
//                 dispach(setUser(res.data.User));
//                 toast.success(res.success.message);
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.response.data.message);         
//         }
//         setOpen(false )
//         console.log(input)
//     }

//     return (
//         <div>
//             <Dialog open={open}>
//                 <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=>setOpen(false)}>
//                     <DialogHeader>
//                         <DialogTitle>update Profile</DialogTitle>
//                     </DialogHeader>
//                     <form onSubmit={SubmitHandler}>
//                         <div className='grid gap-4 py-4'>
//                             <div className='grid grid-col-4 items-center gap-4'>
//                                 <Label htmlFor="name" className="text-right">Name</Label>
//                                 <Input
//                                     id="name"
//                                     value={input.fullname}
//                                     onChange={ChangeEventHandler}
//                                     type="text"
//                                     name="fullname"
//                                     className="col-span-3"
//                                 />

//                             </div>
//                             <div className='grid grid-col-4 items-center gap-4'>
//                                 <Label htmlFor="email" className="text-right">Email</Label>
//                                 <Input
//                                     id="email"
//                                     value={input.email}
//                                     type="email"
//                                     onChange={ChangeEventHandler}
//                                     name="email"
//                                     className="col-span-3"
//                                 />

//                             </div>
//                             <div className='grid grid-col-4 items-center gap-4'>
//                                 <Label htmlFor="number" className="text-right">Number</Label>
//                                 <Input
//                                     id="number"
//                                     type="tel"
//                                     value={input.phoneNumber}
//                                     onChange={ChangeEventHandler}
//                                     name="phoneNumber"
//                                     className="col-span-3"
//                                 />

//                             </div>
//                             <div className='grid grid-col-4 items-center gap-4'>
//                                 <Label htmlFor="bio" className="text-right">Bio</Label>
//                                 <Input
//                                     id="bio"
//                                     type="textarea"
//                                     value={input.bio}
//                                     onChange={ChangeEventHandler}
//                                     name="bio"
//                                     className="col-span-3"
//                                 />

//                             </div>
//                             <div className='grid grid-col-4 items-center gap-4'>
//                                 <Label htmlFor="skill" className="text-right">Skills</Label>
//                                 <Input
//                                     id="skill"
//                                     type="text"
//                                     value={input.skills}
//                                     onChange={ChangeEventHandler}
//                                     name="skills"
//                                     className="col-span-3"
//                                 />
//                             </div>
//                             <div className='grid grid-col-4 items-center gap-4'>
//                                 <Label htmlFor="file" className="text-right">Resume</Label>
//                                 <Input
//                                     id="file"
//                                     value={input.file}
//                                     name="file"
//                                     type="file"
//                                     onChange={FileChangeHandler}
//                                     accept="application/pdf"
//                                     className="col-span-3"
//                                 />
//                             </div>
//                         </div>
//                         <DialogFooter>
//                             {
//                                 Loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'>Plases Wait</Loader2></Button>:<Button type="submit" className="w-full my-4">Update</Button>
//                             }
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//         </div>
//     )
// }


// export default UpdateProfileDialog


















































import { DialogContent, DialogFooter, DialogTitle } from './ui/dialog';
import { Dialog, DialogHeader } from './ui/dialog';
import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import axios from 'axios';
import { USER_API__END_POINT } from '../utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { User } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: User?.fullname || '',
    email: User?.email || '',
    phoneNumber: User?.phoneNumber || '',
    bio: User?.profile?.bio || '',
    skills: User?.profile?.skills?.join(', ') || '',
    file: null,
  });

  const ChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const FileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);
    if (input.file) {
      formData.append('file', input.file);
      console.log("no file")
    }

    try {
      const res = await axios.post(
        `${USER_API__END_POINT}/profile/update`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.User));
        toast.success(res.data.message);
      }
    } catch (error) {
        console.log('yedzva error')
      console.log(error);
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={SubmitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={input.fullname}
                onChange={ChangeEventHandler}
                type="text"
                name="fullname"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={input.email}
                type="email"
                onChange={ChangeEventHandler}
                name="email"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Number
              </Label>
              <Input
                id="number"
                type="tel"
                value={input.phoneNumber}
                onChange={ChangeEventHandler}
                name="phoneNumber"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <textarea
                id="bio"
                value={input.bio}
                onChange={ChangeEventHandler}
                name="bio"
                className="col-span-3 border rounded-lg p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skill" className="text-right">
                Skills
              </Label>
              <Input
                id="skill"
                type="text"
                value={input.skills}
                onChange={ChangeEventHandler}
                name="skills"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={FileChangeHandler}
                accept="application/pdf"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
