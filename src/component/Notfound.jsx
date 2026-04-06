import React from 'react';
import notfound from "../assets/images/Notfound.png"

const Notfound = () => {
    return (
        <div className='flex justify-center'>
            <div className='flex-wrap'>
                <img className="w-[270px] h-[270px] mx-auto" src={notfound} alt="" srcset="" />
                <p className='text-xl text-slate-400 ml-12 mx-auto'>Maaf tidak ada data expanses</p> 
            </div>
        </div>
    );
}

export default Notfound;
