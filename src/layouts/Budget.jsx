import React, { useEffect, useState } from 'react'
import { TotalBudget } from '../services/api';
import LoaderPage from '../component/LoaderPage';


export default function Budget() {
   const [ total, settotal ] = useState([]); 
   const [ loader, setloader ] = useState(true); 
   const token = localStorage.getItem("Token");
    
    async function getTotal(token) {
        try {
          const {response} = await TotalBudget(token);
          settotal(response.data)
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
         getTotal(token);
      }, []); 

     
       useEffect(() => {
         setTimeout(() => {
           setloader(false);
         }, 2000)
       }, [loader])

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">

      {
         loader === true ? ( 
            <div className={`h-44 w-full`}>
               <LoaderPage className={`h-44`}/> 
         </div>
         ) : (

          <>
             {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-gray-800 font-semibold flex items-center gap-2">
          <span className="text-lg">◎</span>
          Budget Overview
        </h2>
        <p className="text-sm text-gray-400">
          Track your spending against your budget limits
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 text-center mb-6">
        
        <div>
          <h3 className="text-2xl font-semibold text-green-600">
            {`Rp. ${parseInt(total[0]?.total_budget).toLocaleString("id-ID")}`}
          </h3>
          <p className="text-sm text-gray-400">Total Budget</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-yellow-700">
            {`Rp. ${parseInt(total[0]?.total_spending).toLocaleString("id-ID")}`}
          </h3>
          <p className="text-sm text-gray-400">Total Spent</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-blue-600">
            {`Rp. ${parseInt(total[0]?.total_remaining).toLocaleString("id-ID")}`}
          </h3>
          <p className="text-sm text-gray-400">Remaining</p>
        </div>

      </div>

      {/* PROGRESS TITLE */}
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>Overall Budget Progress</span>
        <span className="text-amber-500">{total[0]?.progress}%</span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-700  rounded-full"
          style={{ width: `${total[0]?.progress}%` }}
        />
      </div>
      </>
         )
      }
      

    </div>
  );
}
