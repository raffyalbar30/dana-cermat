import React from 'react';
import Navbar from './layouts/Navbar';

const Routers = ({Children}) => {
    return (
        
    <div className='w-screen flex'>
      {/* Navbar */}
       <div className='p-0 md:p-40'>
         <Navbar />
       </div>
         { Children}
    </div>

    );
}

export default Routers;
