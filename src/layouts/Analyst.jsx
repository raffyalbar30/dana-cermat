import { useEffect, useState } from 'react'
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { GiReceiveMoney } from "react-icons/gi";
import { GoCalendar } from "react-icons/go";
import { Chart } from '../services/chart';
import Chart7d from '../component/Chart7d';
import ChartMonth from '../component/ChartMonth';


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
  const [savendays, setsavendays ] = useState([]); 
  const [monthly, setmonthly ] = useState([]); 
  const [threemonth, setthreemonth ] = useState([]);

  
  const token = sessionStorage.getItem("Token");

  const getAnalitics7day = async () => {
      try {
          const response = await Chart("7d", token);
          setsavendays(response.data);
      } catch (error) {
          console.error("Gagal mengambil analytics:", error);
      }
  };

   const getAnaliticsMonth = async () => {
      try {
          const response = await Chart("1m", token);
          setmonthly(response.data);
      } catch (error) {
          console.error("Gagal mengambil analytics:", error);
      }
  };

   const getAnaliticsThreemonth = async () => {
      try {
          const response = await Chart("3m", token);
          setthreemonth(response.data);
      } catch (error) {
          console.error("Gagal mengambil analytics:", error);
      }
  };

  useEffect(() => {
      getAnalitics7day();
      getAnaliticsMonth();
      getAnaliticsThreemonth();
  }, []);



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

                      <ChartMonth data={threemonth} />
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
                     <ChartMonth data={monthly}/>
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
                      Weakly comparison over the last 7 days
                    </p>

                  <Chart7d data={savendays}/>
                  </div>
             </div>
        </div>
      </div>
  )
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