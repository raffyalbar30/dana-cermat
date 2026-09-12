import React from 'react';

const ToasterModalConfirm = ({confirmupdate, Chilldren}) => {
    return (
        <div className={`fixed inset-0 pl-64 z-10 flex items-center justify-center bg-black/50 transition-all ${
            confirmupdate ? "dropdown" : "opacity-0 invisible"}`}>
        <div className={`w-full max-w-xl rounded-2xl bg-white shadow-xl transition-all duration-300 ${
           confirmupdate ? "scale-100 opacity-100" : "scale-95 opacity-0" }`} >
            {Chilldren}
        </div>
       </div>
    );
}

export default ToasterModalConfirm;
