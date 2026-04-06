import React from 'react';
import Navbar from './layouts/Navbar';

const Routers = ({Children}) => {
    return (
        
    <div className='w-screen flex'>
      {/* Navbar */}
      <div className='h-screen w-[380px]'>
         <Navbar />
      </div>
         { Children}
    </div>

    );
}

export default Routers;
