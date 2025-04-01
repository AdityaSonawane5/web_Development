import React from 'react'
// import Avatar from 'react-avatar';

function CreatePost() {
    return (
        <div className='w-[50%]'>
            <div className='m-3'>
                <div className='flex items-center justify-between '>
                    <div className='cursor-pointer'>
                        <h1 className='font-bold text-gray-600 text-lg'>Fro You</h1>
                    </div>
                    <div className='cursor-pointer'>
                        <h1 className='font-bold text-gray-600 text-lg '>Following</h1>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            {/* <Avatar googleId="118096717852922241760" size="100" round={true} /> */}
                        </div>
                        <input />
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CreatePost;
