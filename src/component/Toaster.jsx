import React from 'react';
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";



const Toaster = ({className, stateNotif, Title}) => {
    return (
        <div className={className}>
           <div className='w-full h-full bg-white shadow-2xl rounded-sm'> 
             <div className='flex'> 
                <div className='mt-2 ml-4'>
                 <span className='text-3xl bellanimation'>
                      <MdOutlineNotificationsActive/>
                 </span>
                </div>
                <div className='border mt-2 ml-2 border-blue-700'> </div>
                <div className='flex-wrap w-full'>
                <div className='ml-4 mt-2'> 
                    <span>{Title}</span>
                 </div>
                 <div className='snackbar ml-4'></div>
                </div>

                <div className='mr-2 mt-2 cursor-pointer'>
                    <span className='text-[24px]' onClick={stateNotif}><IoCloseOutline/></span>
                </div>

             </div>
           </div>
        </div>
    );
}

export default Toaster;
