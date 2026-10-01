import { useEffect, useState } from 'react'
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import { GiReceiveMoney } from "react-icons/gi";
import { GoCalendar } from "react-icons/go";
import { Chart } from '../services/chart';
import Chart7d from '../component/Chart7d';
import ChartMonth from '../component/ChartMonth';
import Chartpiecategories from '../component/Chartpiecategories';
import BudgetProgress from '../component/Budget';
import { TotalAVGTransaction } from '../services/api';




export default function Analyst() {

  const [chart, setchart] = useState("Mothly");
  const [savendays, setsavendays ] = useState([]); 
  const [monthly, setmonthly ] = useState([]); 
  const [threemonth, setthreemonth ] = useState([]);
  const [ total, settotal ] = useState([]); 

  
  const token = sessionStorage.getItem("Token");

  const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(amount || 0));
};

  const analyst = [
  {
    type: "Avg Monthly Income",
    amount: formatRupiah(total[0]?.avg_monthly_income),
    description: `${total[0]?.avg_income_rate}% from last quarter`,
    icons: <IoIosTrendingUp />,
  },
  {
    type: "Avg Monthly Expenses",
    amount: formatRupiah(total[0]?.avg_monthly_expense),
    description: `${total[0]?.avg_expense_rate}% from last quarter`,
    icons: <IoIosTrendingDown />,
  },
  {
    type: "Avg Monthly Savings",
    amount: formatRupiah(total[0]?.avg_monthly_saving),
    description: `Saving rate ${total[0]?.avg_monthly_saving_rate}%`,
    icons: <GiReceiveMoney />,
  },
  {
    type: "Days to Goal",
    amount: "90",
    description: "At current savings rate",
    icons: <GoCalendar />,
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

   async function getTotal(token) {
          try {
            const response = await TotalAVGTransaction(token);
            settotal(response.data);
          } catch (error) {
            console.log(error);
          }
        }

  useEffect(() => {
      getAnalitics7day();
      getAnaliticsMonth();
      getAnaliticsThreemonth();
      getTotal(token);
  }, []);

  return (
      <div className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">

  {/* Summary Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {analyst.map((items) => {
      return (
        <Cards
          key={items.type}
          title={items.type}
          value={items.amount}
          desc={items.description}
          color="text-blue-700"
          icons={items.icons}
        />
      );
    })}
  </div>


  {/* Chart Tabs */}
  <div className="w-full overflow-x-auto mb-4">
    <div className="flex gap-x-1 bg-gray-200 p-1 rounded-full w-fit min-w-max">

      {getChart.map((items) => (
        <button
          key={items.name}
          onClick={() => setchart(items.name)}
          className={`
            px-3
            sm:px-4
            py-1.5
            text-xs
            sm:text-sm
            font-medium
            rounded-full
            transition-all
            whitespace-nowrap
            ${
              chart === items.name
                ? "bg-white text-gray-900 shadow"
                : "text-gray-500 hover:text-gray-900"
            }
          `}
        >
          {items.name}
        </button>
      ))}

    </div>
  </div>


  {/* Main Charts */}
  <div className="mt-4 w-full">

    {chart === "Categories" ? (

      /* Categories */
      <div className="w-full min-w-0">
        <div className="bg-white w-full rounded-xl shadow-sm p-4 sm:p-5 overflow-hidden">
          <Chartpiecategories />
        </div>
      </div>

    ) : chart === "Goals" ? (

      /* Goals */
      <div className="w-full min-w-0">
        <div className="bg-white w-full rounded-xl shadow-sm p-4 sm:p-5 overflow-hidden">
          <BudgetProgress />
        </div>
      </div>

    ) : (

      /* Monthly / Default */
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

        {/* 3 Months */}
        <div className="w-full min-w-0">
          <div className="bg-white w-full rounded-xl shadow-sm p-4 sm:p-5 overflow-hidden">

            <h3 className="font-semibold text-sm sm:text-base text-gray-800">
              Income vs Expenses
            </h3>

            <p className="text-xs sm:text-sm text-gray-400 mb-4">
              Monthly comparison over the last 3 months
            </p>

            <div className="w-full overflow-x-auto">
              <div className="min-w-[300px]">
                <ChartMonth data={threemonth} />
              </div>
            </div>

          </div>
        </div>


        {/* 1 Month */}
        <div className="w-full min-w-0">
          <div className="bg-white w-full rounded-xl shadow-sm p-4 sm:p-5 overflow-hidden">

            <h3 className="font-semibold text-sm sm:text-base text-gray-800">
              Income vs Expenses
            </h3>

            <p className="text-xs sm:text-sm text-gray-400 mb-4">
              Monthly comparison over the last 1 month
            </p>

            <div className="w-full overflow-x-auto">
              <div className="min-w-[300px]">
                <ChartMonth data={monthly} />
              </div>
            </div>

          </div>
        </div>

      </div>
    )}

  </div>


  {/* 7 Days */}
  <div className="mt-4 w-full">

    <div className="bg-white w-full rounded-xl shadow-sm p-4 sm:p-5 overflow-hidden">

      <h3 className="font-semibold text-sm sm:text-base text-gray-800">
        Income vs Expenses
      </h3>

      <p className="text-xs sm:text-sm text-gray-400 mb-4">
        Weekly comparison over the last 7 days
      </p>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[300px]">
          <Chart7d data={savendays} />
        </div>
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