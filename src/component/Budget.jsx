import React, { useEffect, useState } from "react";
import { GetAllbudgets } from "../services/api";

export default function BudgetProgress() {
  const [monthly, setmonthly] = useState([]);
  const [animate, setAnimate] = useState(false);

  const Token = sessionStorage.getItem("Token");

  const getBudgetProgress = async () => {
    try {
      const { response } = await GetAllbudgets(Token);
      setmonthly(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBudgetProgress();
  }, []);

useEffect(() => {
  const timer = setTimeout(() => {
    setAnimate(true);
  }, 100);

  return () => clearTimeout(timer);
}, []);


  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      {/* Header */}
      <h2 className="text-sm font-semibold text-gray-800">
        Budget Progress
      </h2>

      <p className="text-xs text-gray-400 mb-6">
        Track your spending against your budget
      </p>

      <div className="space-y-6">
        {[...monthly]
          .map((item) => {
            const used = Number(item.used_amount);
            const total = Number(item.budget_amount);

            const percent =
              total === 0
                ? 0
                : Math.min((used / total) * 100, 100);

            return {
              ...item,
              used,
              total,
              percent,
            };
          })
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 5)
          .map((item) => (
            <div key={item.id_budgets}>
              {/* Top Row */}
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">
                  {item.name_categories}
                </span>

                <span className="text-xs text-gray-400">
                  Rp{item.used.toLocaleString("id-ID")} / Rp
                  {item.total.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-700 transition-all duration-500"
                  style={{
                  width: animate ? `${item.percent}%` : "0%",
                  }}

                />
              </div>

              {/* Percentage */}
              <div className="mt-1 flex justify-end">
                <span className="text-xs text-gray-400">
                  {item.percent.toFixed(1)}% used
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}