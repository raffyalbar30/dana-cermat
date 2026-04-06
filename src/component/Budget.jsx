import React from "react";

const budgets = [
  {
    name: "Food & Dining",
    used: 850,
    total: 1000,
  },
  {
    name: "Transportation",
    used: 420,
    total: 500,
  },
  {
    name: "Shopping",
    used: 680,
    total: 800,
  },
  {
    name: "Entertainment",
    used: 320,
    total: 400,
  },
];

export default function BudgetProgress() {
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
        {budgets.map((item, index) => {
          const percent = (item.used / item.total) * 100;

          return (
            <div key={index}>
              {/* Top Row */}
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-700 font-medium">
                  {item.name}
                </span>
                <span className="text-gray-400 text-xs">
                  ${item.used} / ${item.total}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-700  rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Percentage */}
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-400">
                  {percent.toFixed(1)}% used
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}