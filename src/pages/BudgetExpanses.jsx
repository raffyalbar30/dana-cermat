import React from 'react';
import Budget from '../layouts/Budget';
import BudgetCategory from '../layouts/BudgetCategory';


const BudgetExpanses = () => {
    return (
     <div className='flex-wrap bg-slate-50 p-6 w-full'>
        <Budget/>
        <BudgetCategory/>
        <div className="flex justify-center mt-6 mb-3">
            <span className='text-gray-500 text-[12px]'> © 2026 Dana-Cermat. All Rights Reserved. Designed & Developed by Raffy_samaa.</span>
        </div> 
     </div>
    );
}

export default BudgetExpanses;
