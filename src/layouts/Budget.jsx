import React from 'react'

export default function Budget() {
  const totalBudget = 3900;
  const totalSpent = 3190;
  const remaining = totalBudget - totalSpent;

  const progress = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      
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
          <h3 className="text-2xl font-semibold text-gray-900">
            $3,900
          </h3>
          <p className="text-sm text-gray-400">Total Budget</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-yellow-600">
            $3,190
          </h3>
          <p className="text-sm text-gray-400">Total Spent</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-blue-600">
            $710
          </h3>
          <p className="text-sm text-gray-400">Remaining</p>
        </div>

      </div>

      {/* PROGRESS TITLE */}
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>Overall Budget Progress</span>
        <span>{progress}%</span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-700  rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
}
