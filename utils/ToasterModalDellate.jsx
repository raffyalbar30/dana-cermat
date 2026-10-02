import React from 'react';

const ToasterModalDellate = ({dellatedconfim, Chilldren}) => {
    return (
        <div className={`
                fixed inset-0 z-10
                flex items-center justify-center
                px-4 md:pl-64

                bg-black/50
                backdrop-blur-[2px]

                transition-all duration-400
                ease-[cubic-bezier(0.22,1,0.36,1)]

                ${
                dellatedconfim
                    ? "opacity-100 visible"
                    : "opacity-0 invisible pointer-events-none"
                }
            `}
        >
            <div
                className={`
                w-full max-w-xl
                rounded-2xl
                bg-white
                shadow-2xl

                transform-gpu
                transition-all duration-400
                ease-[cubic-bezier(0.22,1,0.36,1)]

                ${
                    dellatedconfim
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-3 scale-[0.97] opacity-0"
                }
                `}
            >
                {Chilldren}
            </div>
        </div>
    );
}

export default ToasterModalDellate;
