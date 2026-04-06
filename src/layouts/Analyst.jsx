import { useState } from 'react'
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { GiReceiveMoney } from "react-icons/gi";
import { GoCalendar } from "react-icons/go";
import Cards from '../component/Cards';

 const analyst = [
    {
      type: "Avg Monthly Income",
      amount: "$4,047",
      description: "+8.2% from last quarter",
      icons: <IoIosTrendingUp/>
    },
    {
      type: "Avg Monthly Expenses",
      amount: "$2,958",
      description: "3.1% from last quarter",
      icons: <IoIosTrendingDown/>
    },
     {
      type: "Avg Monthy Savings Rate",
      amount: "26.9%",
      description: "Above recommended 20%",
      icons: <GiReceiveMoney/>
    },
     {
      type: "Days to Goal",
      amount: "90",
      description: "At current savings rate",
      icons : <GoCalendar/>
    },
  ];

  const getChart = [ 
    {
      name:"Mothly"
    }, 
    {
      name:"Categories"
    },
    {
      name:"Goals"
    }
  ]

export default function Analyst() {

  const [chart, setchart] = useState("Mothly");

  return (
      <div className="min-h-screen bg-slate-50 p-6">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
             {
               analyst.map((items) => {
                 return (
                     <Cards
                    title={items.type}
                    value={items.amount}
                    desc={items.description}
                    color="text-blue-700"
                    icons={items.icons}
                    />
                 )
               })
             }
          </div>
        {/* main content */}
        <div className='flex flex-wrap'>
           <div className="flex gap-x-2 bg-gray-200 p-1 w-[50px] rounded-full w-fit">
             {
               getChart.map((items) => {
                return (
                    <button className={`${items.name === chart ? `px-4 py-1.5  bg-white rounded-full shadow` : `text-gray-800`} text-sm font-medium mr-2`}>
                       {items.name}
                   </button>
                )
               })
             }
            </div>
        </div>

        <div className=' mt-4 flex gap-x-6'>
            {/* 3 monthly */}
             <div className='w-1/2'>
                 <div className="lg:col-span-2 bg-white w-full rounded-xl shadow-sm p-4">
                    <h3 className="font-semibold text-gray-800">
                      Income vs Expenses
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Monthly comparison over the last 3 months
                    </p>

                      {/* CHART PLACEHOLDER */}
                      <div className="flex gap-x-2">

                        {/* LABEL ANGKA */}
                        <div className="flex items-end">
                          <div className="grid grid-rows-5 h-[360px] text-[14px] mt-9">
                            {["Rp.1.500.000", "Rp.1.000.000", "Rp.500.000"].map(
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
                            {[1,2,3,4].map((_,i)=>(
                              <div key={i} className="border-t border-dashed border-gray-300"></div>
                            ))}
                          </div>

                          <div className='flex gap-x-4 absolute h-full w-full z-10'>
                            <div className="flex items-end gap-2 ml-10 ">
                              <div className="w-12 bg-green-500 h-[120px]"></div>
                              <div className="w-12 bg-red-500 h-[200px]"></div>
                            </div>
                            <div className="flex items-end gap-2 ml-4 ">
                              <div className="w-12 bg-green-500 h-[300px]"></div>
                              <div className="w-12 bg-red-500 h-[200px]"></div>
                            </div>
                            <div className="flex items-end gap-2 ml-4 ">
                              <div className="w-12 bg-green-500 h-[100px]"></div>
                              <div className="w-12 bg-red-500 h-[250px]"></div>
                            </div>
                          </div>
                        </div>

                        {/* LABEL BULAN */}
                        <div className="flex gap-x-28 mt-2 ml-20">
                          {["Jan", "Feb", "Mar"].map((m, i) => (
                            <span key={i} className="text-xs text-gray-400">
                              {m}
                            </span>
                          ))}
                        </div>

                      </div>

                      </div>
                  </div>
             </div>
             
             {/* 1 monthly */}
               <div className='w-1/2'>
                 <div className="lg:col-span-2 bg-white w-full rounded-xl shadow-sm p-4">
                    <h3 className="font-semibold text-gray-800">
                      Income vs Expenses
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Monthly comparison over the last 1 months
                    </p>

                      {/* CHART PLACEHOLDER */}
                      <div className="flex gap-x-2">

                        {/* LABEL ANGKA */}
                        <div className="flex items-end">
                          <div className="grid grid-rows-5 h-[360px] text-[14px] mt-9">
                            {["Rp.1.500.000", "Rp.1.000.000", "Rp.500.000"].map(
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
                            {[1,2,3,4].map((_,i)=>(
                              <div key={i} className="border-t border-dashed border-gray-300"></div>
                            ))}
                          </div>

                          <div className='flex gap-x-4 absolute h-full w-full z-10'>
                            <div className="flex items-end gap-2 ml-10 ">
                              <div className="w-12 bg-green-500 h-[120px]"></div>
                              <div className="w-12 bg-red-500 h-[200px]"></div>
                            </div>
                          </div>
                        </div>

                        {/* LABEL BULAN */}
                        <div className="flex gap-x-20 mt-2 ml-16">
                          {["weak 1", "weak 2", "weak 3", "weak 4"].map((m, i) => (
                            <span key={i} className="text-xs text-gray-400">
                              {m}
                            </span>
                          ))}
                        </div>

                      </div>

                      </div>
                  </div>
             </div>
        </div>

        {/* perday */}
        <div className='mt-4'>
              {/* days monthly */}
               <div className='w-full'>
                 <div className="lg:col-span-2 bg-white w-full rounded-xl shadow-sm p-4">
                    <h3 className="font-semibold text-gray-800">
                      Income vs Expenses
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      7 days comparison over the last month
                    </p>

                      {/* CHART PLACEHOLDER */}
                      <div className="flex gap-x-2">

                        {/* LABEL ANGKA */}
                        <div className="flex items-end">
                          <div className="grid grid-rows-5 h-[360px] text-[14px] mt-9">
                            {["Rp.1.500.000", "Rp.1.000.000", "Rp.500.000"].map(
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
                            {[1,2,3,4].map((_,i)=>(
                              <div key={i} className="border-t border-dashed border-gray-300"></div>
                            ))}
                          </div>

                          <div className='flex gap-x-4 absolute h-full w-full z-10'>
                            <div className="flex items-end gap-2 ml-10 ">
                              <div className="w-16 bg-green-500 h-[120px]"></div>
                              <div className="w-16 bg-red-500 h-[200px]"></div>
                            </div>
                            <div className="flex items-end gap-2 ml-10 ">
                              <div className="w-16 bg-green-500 h-[120px]"></div>
                              <div className="w-16 bg-red-500 h-[200px]"></div>
                            </div>
                            <div className="flex items-end gap-2 ml-10 ">
                              <div className="w-16 bg-green-500 h-[120px]"></div>
                              <div className="w-16 bg-red-500 h-[200px]"></div>
                            </div>
                            <div className="flex items-end gap-2 ml-10 ">
                              <div className="w-16 bg-green-500 h-[120px]"></div>
                              <div className="w-16 bg-red-500 h-[200px]"></div>
                            </div>
                          </div>
                        </div>

                        {/* LABEL BULAN */}
                        <div className="flex gap-x-36 mt-2 ml-24">
                          {["day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7"].map((m, i) => (
                            <span key={i} className="text-xs text-gray-400">
                              {m}
                            </span>
                          ))}
                        </div>

                      </div>

                      </div>
                  </div>
             </div>
        </div>
      </div>
  )
}
