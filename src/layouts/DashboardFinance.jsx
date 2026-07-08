import React, { useEffect, useState } from 'react';
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { RxTarget } from "react-icons/rx";
import BudgetProgress from '../component/Budget';
import { TotalTransaction } from '../services/api';




export default function DashboardFinance() {

  const [ total, settotal ] = useState([]); 
    
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
      }, [])
    
    const barData = [
    { month: "Jan", income: 4000, expense: 2400 },
    { month: "Feb", income: 3000, expense: 1400 },
    { month: "Mar", income: 5000, expense: 3600 },
    { month: "Apr", income: 4500, expense: 3800 },
    { month: "May", income: 3800, expense: 2800 },
    { month: "Jun", income: 4200, expense: 3200 },
  ];

  const categories = [
    { label: "Food & Dining", value: "27%", color: "bg-indigo-400" },
    { label: "Bills & Utilities", value: "29%", color: "bg-cyan-400" },
    { label: "Shopping", value: "21%", color: "bg-yellow-400" },
    { label: "Transportation", value: "13%", color: "bg-green-400" },
    { label: "Entertainment", value: "10%", color: "bg-orange-400" },
  ];

  
  return (
    // Card dashboard
    <div className="min-h-screen bg-slate-50 p-6">

   
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Cards
          title="Total Income"
          value={`Rp. ${parseInt(total[0]?.total_income).toLocaleString("id-ID")}`}
          desc="+12% from last month"
          color="text-green-600"
          icons={<IoIosTrendingUp/>}
        />
        <Cards
          title="Total Expenses"
          value={`Rp. ${parseInt(total[0]?.total_expense).toLocaleString("id-ID")}`}
          desc="-8% from last month"
          color="text-red-500"
          icons={<IoIosTrendingDown/>}
        />
        <Cards
          title="Net Savings"
          value="Rp. 0"
          desc="0% savings rate"
          color="text-blue-600"
          icons={<GiReceiveMoney/>}
        />
        <Cards
          title="Budget Status"
          value="0%"
          desc="of monthly budget used"
          color="text-orange-500"
          icons={<RxTarget/>}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-2 pr-24">
        {/* BAR CHART */}
        <div className="lg:col-span-2 bg-white w-[800px] rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800">
            Income vs Expenses
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Monthly comparison over the last 6 months
          </p>

          {/* CHART PLACEHOLDER */}
          <div className="flex gap-x-2">

            {/* LABEL ANGKA */}
            <div className="flex items-end">
              <div className="grid grid-rows-5 h-[360px] text-[14px] mt-9">
                {["Rp.2.000.000", "Rp.1.500.000", "Rp.1.000.000", "Rp.500.000", "0"].map(
                  (item, i) => (
                    <div key={i} className="flex items-center justify-end text-gray-500">
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          <div className="flex flex-col w-full">

            <div
              className="relative grid grid-rows-5 h-[360px] w-full"
              style={{
                borderTop: "1px dashed #d1d5db",
                borderLeft: "1px solid #d1d5db",
                borderRight: "1px dashed #9ca3af",
                borderBottom: "1px solid #9ca3af",
              }}
            >
              <div className="absolute inset-0 grid grid-rows-5">
                {[1,2,3,4,5].map((_,i)=>(
                  <div key={i} className="border-t border-dashed border-gray-300"></div>
                ))}
              </div>

              <div className='flex gap-x-4 absolute h-full w-full z-10'>
                <div className="flex items-end gap-2 ml-10 ">
                  <div className="w-8 bg-green-500 h-[120px]"></div>
                  <div className="w-8 bg-red-500 h-[200px]"></div>
                </div>
                <div className="flex items-end gap-2 ml-4 ">
                  <div className="w-8 bg-green-500 h-[300px]"></div>
                  <div className="w-8 bg-red-500 h-[200px]"></div>
                </div>
                <div className="flex items-end gap-2 ml-4 ">
                  <div className="w-8 bg-green-500 h-[100px]"></div>
                  <div className="w-8 bg-red-500 h-[250px]"></div>
                </div>
                <div className="flex items-end gap-2 ml-4 ">
                  <div className="w-8 bg-green-500 h-[110px]"></div>
                  <div className="w-8 bg-red-500 h-[100px]"></div>
                </div>
                <div className="flex items-end gap-2 ml-4 ">
                  <div className="w-8 bg-green-500 h-[130px]"></div>
                  <div className="w-8 bg-red-500 h-[100px]"></div>
                </div>
                <div className="flex items-end gap-2 ml-4 ">
                  <div className="w-8 bg-green-500 h-[130px]"></div>
                  <div className="w-8 bg-red-500 h-[170px]"></div>
                </div>
              </div>
            </div>

            {/* LABEL BULAN */}
            <div className="flex gap-x-20 mt-2 ml-20">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
                <span key={i} className="text-xs text-gray-400">
                  {m}
                </span>
              ))}
            </div>

          </div>

          </div>
          </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-xl shadow-sm p-5 w-[500px] ">
          <h3 className="font-semibold text-gray-800">
            Expense Categories
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Current month breakdown
          </p>

          {/* PIE PLACEHOLDER */}
          <div className="flex justify-center items-center h-[220px]">
            <div className="relative w-60 h-60 rounded-full" 
              style={{
              background: `conic-gradient(
                #22c55e 0% 27%,
                #3b82f6 27% 48%,
                #f59e0b 48% 61%,
                #ef4444 61% 71%,
                #e5e7eb 71% 100%
              )`,
            }}>
            </div>
          </div>

          {/* LEGEND */}
          <div className="space-y-2 mt-4 text-sm pt-4">
            <Legend color="bg-purple-400" label="Food & Dining" value="27%" />
            <Legend color="bg-yellow-400" label="Shopping" value="21%" />
            <Legend color="bg-green-400" label="Transportation" value="13%" />
            <Legend color="bg-orange-400" label="Entertainment" value="10%" />
          </div>
        </div>
        </div>

        <div className='w-full mt-8'>
           <BudgetProgress/>
        </div>
      
         <div className="flex justify-center mt-6 mb-3">
            <span className='text-gray-500 text-[12px]'> © 2026 Dana-Cermat. All Rights Reserved. Designed & Developed by Raffy_samaa.</span>
        </div> 
      </div>
  )}



function Legend({ color, label, value }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-gray-600">{label}</span>
      </div>
      <span className="text-gray-500">{value}</span>
    </div>
  );
}


function Cards({ title, value, desc, color, icons }) {

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className='flex items-center justify-between'>
      <p className="text-sm text-gray-400">{title}</p>
      <span className='text-[23px] text-slate-400'>{icons}</span>
      </div>
      <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
      <p className="text-xs text-gray-400 mt-1">{desc}</p>
    </div>
  )
}