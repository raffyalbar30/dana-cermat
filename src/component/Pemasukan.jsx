import React from 'react';
import { Children } from 'react';
import { MdAttachMoney } from "react-icons/md";




const Pemasukan = ({ Children}) => {
    return (
        <div className='bg-[#3F47F4] w-[270px] rounded-lg'>
             <div className='flex gap-x-4'> 
                <MdAttachMoney className='text-[55px] mb-4 ml-4 mt-2 text-white'/>
                  <div className='flex-wrap mt-2'> 
                      <p className='text-xl text-white font-semibold'>{Children}</p>
                      <p className='text-lg font-semibold text-white'>Rp.500.000</p>
                  </div>
             </div>
        </div>
    );
}

export default Pemasukan;
