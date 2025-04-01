import React from 'react'
import { IoMdHome } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

function LeftSidebar() {
    return (
        <div className='w-[20%]'>
            <div>
                <div>
                    <img className='ml-5' width={'24px'} src="data:image/png;base64,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" alt="twittwe-clone" />
                </div>
                <div className='my-4'>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <IoMdHome size={'24px'} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>Home</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <FaHashtag size={'24px'} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>Explore</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <IoMdNotifications size={'24px'} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>Notifications</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <FaUser size={'24px'} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>Profile</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <FaBookmark size={'24px'} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
                    </div>
                    <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                        <div>
                            <IoLogOut size={'24px'} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'>LogOut</h1>
                    </div>
                    <button className='px-4 py-2 border-none text-md bg-[#109BF0] w-full rounded-full text-white font-bold '>Post</button>
                    {/* 32:00 timestamp chalu aahe aani icone lavnar aahe aata bakichy na  */}
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar
