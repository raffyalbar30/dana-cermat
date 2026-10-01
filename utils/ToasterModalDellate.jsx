import React from 'react';

const ToasterModalDellate = ({dellatedconfim, Chilldren}) => {
    return (
        <div className={`fixed inset-0 z-10 flex items-center justify-center
            px-4 md:pl-64
            bg-black/50 transition-all
            ${dellatedconfim ? "dropdown" : "opacity-0 invisible"}`}
            >
        <div
            className={`w-full max-w-xl rounded-2xl bg-white shadow-xl transition-all duration-300
            ${dellatedconfim ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
            {Chilldren}
        </div>
        </div>
    );
}

export default ToasterModalDellate;
