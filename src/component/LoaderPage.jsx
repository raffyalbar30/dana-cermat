import React from 'react';

const LoaderPage = ({className}) => {
    return (
        <div className={`flex justify-between items-center`}>
        <div></div>
        <div className={` animate-pulse w-full`}>
            <div className={`size-4 rounded-sm ${className} rounded-2xl bg-slate-200 w-full`}></div>
        </div>
        </div>
    );
}

export default LoaderPage;
