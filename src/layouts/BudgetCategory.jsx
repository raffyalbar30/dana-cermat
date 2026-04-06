import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";


export default function BudgetCategory() {

  const budgets = [
    {
      title: "Food & Dining",
      used: 850,
      total: 1000
    },
    {
      title: "Transportation",
      used: 420,
      total: 500
    },
    {
      title: "Shopping",
      used: 680,
      total: 800
    }, 
    {
      title: "Bills & Utilitis",
      used: 920,
      total: "1.200"
    }
  ];

  return (
    <div className="w-full rounded-lg border border-slate-200 bg-slate-50 mt-8 mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Budget Categories</h2>
          <p className="text-sm text-gray-500">
            Manage your spending limits by category
          </p>
        </div>

        <button className="bg-blue-700  text-white text-sm px-4 py-2 rounded-lg hover:opacity-90">
          + Add Budget
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {budgets.map((budget, i) => (
          <BudgetCard key={i} {...budget} />
        ))}
      </div>

    </div>
  );
}


function BudgetCard({ title, used, total }) {

  const percent = Math.round((used / total) * 100);
  const remaining = total - used;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">

      {/* Top */}
      <div className="flex justify-between items-start mb-4">

        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-gray-500">Monthly Budget</p>
          <p className="text-sm mt-1">
            ${used} / ${total}
          </p>
        </div>

        <div className="flex items-center gap-2">

          <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
            <IoWarningOutline size={12}/>
            Warning
          </span>

          <button className="p-2 border rounded-md hover:bg-gray-50">
            <PiNotePencil size={14}/>
          </button>

          <button className="p-2 border rounded-md hover:bg-gray-50">
            <IoTrashOutline size={14}/>
          </button>

        </div>
      </div>


      {/* Progress */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-blue-700 "
          style={{ width: `${percent}%` }}
        />
      </div>


      {/* Bottom */}
      <div className="flex justify-between text-xs text-gray-500">
        <span className="text-amber-500 font-medium">
          {percent}.0%
        </span>

        <span>
          ${remaining} remaining
        </span>
      </div>

    </div>
  );
}