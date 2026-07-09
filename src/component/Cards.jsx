import React, { useEffect, useState } from 'react'
import { TotalTransaction } from '../services/api';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { GiReceiveMoney } from 'react-icons/gi';
import LoaderPage from './LoaderPage';

export default function AllCards() {

   const [ total, settotal ] = useState([]); 
   const [ loader, setloader ] = useState(true);
  
    const token = localStorage.getItem("Token");
  
    async function getTotal(token) {
      try {
        const {response} = await TotalTransaction(token);
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
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                     <Cards
                     loader={loader}
                     title="Total Income"
                     value={`Rp. ${parseInt(total[0]?.total_income).toLocaleString("id-ID")}`}
                     desc="+12% from last month"
                     color="text-green-600"
                     icons={<IoIosTrendingUp/>}
                     />
                     <Cards
                     loader={loader}
                     title="Total Expenses"
                     value={`Rp. ${parseInt(total[0]?.total_expense).toLocaleString("id-ID")}`}
                     desc="-8% from last month"
                     color="text-red-500"
                     icons={<IoIosTrendingDown/>}
                     />
                     <Cards
                     loader={loader}
                     title="Net Belance"
                     value={`Rp. ${parseInt(total[0]?.net_balance).toLocaleString("id-ID")}`}
                     desc="24.0% form last month"
                     color="text-blue-600"
                     icons={<GiReceiveMoney/>}
                     />
  </div>
  );

}

function Cards({ title, value, desc, color, icons, loader }) {

  return (
     <div className="bg-white rounded-xl shadow-sm p-5">
    {
       loader === true ? (
        <div className={`h-24 w-full`}>
             <LoaderPage className={`h-24`}/> 
        </div>
       ) : (
         <>
         <div className='flex items-center justify-between'>
         <p className="text-sm text-gray-400">{title}</p>
         <span className='text-[23px] text-slate-400'>{icons}</span>
         </div>
         <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
         <p className="text-xs text-gray-400 mt-1">{desc}</p>
         </>
       )
    }
    </div>
  )
}

