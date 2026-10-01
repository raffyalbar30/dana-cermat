import React, { useEffect, useState } from "react";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { RxTarget } from "react-icons/rx";
import BudgetProgress from "../component/Budget";
import { TotalBudget, TotalTransaction } from "../services/api";
import LoaderPage from "../component/LoaderPage";
import ChartMonth from "../component/ChartMonth";
import { Chart } from "../services/chart";
import ExpensePieChart from "../component/Chartpie";

export default function DashboardFinance() {
  const [total, settotal] = useState([]);
  const [budget, setbudget] = useState([]);
  const [loader, setloader] = useState(true);
  const [monthly, setmonthly] = useState([]);
  const token = sessionStorage.getItem("Token");

  const getAnaliticsMonth = async () => {
    try {
      const response = await Chart("1m", token);
      setmonthly(response.data);
    } catch (error) {
      console.error("Gagal mengambil analytics:", error);
    }
  };

  async function getTotal(token) {
    try {
      const { response } = await TotalTransaction(token);
      settotal(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTotalBudget(token) {
    try {
      const { response } = await TotalBudget(token);
      setbudget(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTotalBudget(token);
  }, []);

  useEffect(() => {
    getTotal(token);
    getAnaliticsMonth();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 2000);
  }, [loader]);

  return (
    // Card dashboard
    <div className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Cards
          loader={loader}
          title="Total Income"
          value={`Rp. ${
            !total?.total_income
              ? "0"
              : parseInt(total?.total_income).toLocaleString("id-ID")
          }`}
          desc={`${total?.income_rate}% from last month`}
          color="text-green-600"
          icons={<IoIosTrendingUp />}
        />

        <Cards
          loader={loader}
          title="Total Expenses"
          value={`Rp. ${
            !total?.total_expense
              ? "0"
              : parseInt(total?.total_expense).toLocaleString("id-ID")
          }`}
          desc={`${total?.expense_rate}% from last month`}
          color="text-red-500"
          icons={<IoIosTrendingDown />}
        />

        <Cards
          loader={loader}
          title="Net Savings"
          value={`Rp. ${
            !total?.net_balance
              ? "0"
              : parseInt(total?.net_balance).toLocaleString("id-ID")
          }`}
          desc={`${total?.net_balance_rate}% savings rate`}
          color="text-blue-600"
          icons={<GiReceiveMoney />}
        />

        <Cards
          loader={loader}
          title="Budget Status"
          value={`${budget[0]?.progress ?? 0}%`}
          desc="of monthly budget used"
          color="text-orange-500"
          icons={<RxTarget />}
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full min-w-0">
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
            Income vs Expenses
          </h3>

          <p className="text-xs sm:text-sm text-gray-400 mb-4">
            Monthly comparison over the last 1 months
          </p>

          {/* Chart wrapper */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[300px]">
              <ChartMonth data={monthly} />
            </div>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 w-full min-w-0">
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
            Expense Categories
          </h3>

          <p className="text-xs sm:text-sm text-gray-400 mb-4">
            Current month breakdown
          </p>

          <div className="w-full">
            <ExpensePieChart />
          </div>
        </div>
      </div>


      <div className="w-full mt-6 sm:mt-8">
        <BudgetProgress />
      </div>

      <div className="flex justify-center mt-6 mb-3 px-4">
        <span className="text-gray-500 text-[10px] sm:text-xs text-center leading-relaxed">
          © 2026 Dana-Cermat. All Rights Reserved. Designed & Developed by
          Raffy_samaa.
        </span>
      </div>
    </div>
  );
}

function Cards({ title, value, desc, color, icons, loader }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      {loader === true ? (
        <div className={`h-20 w-full`}>
          <LoaderPage className={`h-20`} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">{title}</p>
            <span className="text-[23px] text-slate-400">{icons}</span>
          </div>
          <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
          <p className="text-xs text-gray-400 mt-1">{desc}</p>
        </>
      )}
    </div>
  );
}
