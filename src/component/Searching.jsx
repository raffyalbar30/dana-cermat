import React from 'react';
import { IoIosSearch } from "react-icons/io";


const Searching = ({ onChange, onClick}) => {
    return (
      <form className="relative mb-2 w-full pr-8">
        <input type="text" placeholder="Search your expanse..."
            className="w-full rounded-md border-2 border-gray-300 p-2 pr-16 
             focus:outline-none focus:ring-0 " onChange={onChange} />

        <div className="cursor-pointer absolute right-4 pr-7 top-1/2 z-10 -translate-y-1/2 text-gray-500"
        onClick={onClick}>
             <IoIosSearch  className='text-[26px]'/>
        </div>
      </form>
    );
}

export default Searching;
