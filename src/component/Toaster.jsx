import React from 'react';
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";



const Toaster = ({className}) => {
    return (
        <div className={className}>
           <div className='w-full h-full bg-white shadow-2xl rounded-sm'> 
             <div className='flex'> 
                <div className='mt-2 ml-4'>
                 <span className='text-3xl'>
                      <MdOutlineNotificationsActive/>
                 </span>
                </div>
                <div className='border mt-2 ml-2 border-green-600'> </div>
                <div className='flex-wrap w-full'>
                <div className='ml-4 mt-2'> 
                    <span>data transaksi sudah ditambahkan !!</span>
                 </div>
                 <div className='snackbar mt-1 bg-green-600 mx-2 h-1'></div>
                </div>

                <div className='mr-2 mt-2 cursor-pointer'>
                    <span className='text-[24px]'><IoCloseOutline/></span>
                </div>

             </div>
           </div>
        </div>
    );
}

export default Toaster;
