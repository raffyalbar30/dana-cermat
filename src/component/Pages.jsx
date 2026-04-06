import React from 'react';


const Pages = ({Components, ClassName, HandleClick, disable}) => {
    return (
        <div onClick={HandleClick} className='rounded-lg border border-slate-200 mt-8'>
             <button className={ClassName} disabled={disable}>{ Components }</button>
        </div>
    );
}

export default Pages;
