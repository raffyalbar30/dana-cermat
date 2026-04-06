import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import Paginations from "./Paginations";
import Pages from "../component/Pages";

export default function Transactional() {
  const transactions = [
    {
      type: "income",
      amount: "$4,200",
      category: "Salary",
      description: "Monthly salary",
      date: "1/1/2024",
    },
    {
      type: "expense",
      amount: "$850",
      category: "Food & Dining",
      description: "Groceries and restaurants",
      date: "1/2/2024",
    },
    {
      type: "expense",
      amount: "$420",
      category: "Transportation",
      description: "Gas and car maintenance",
      date: "1/3/2024",
    },
    {
      type: "expense",
      amount: "$920",
      category: "Bills & Utilities",
      description: "Electricity, water, internet",
      date: "1/4/2024",
    },
    {
      type: "income",
      amount: "$500",
      category: "Freelance",
      description: "Web design project",
      date: "1/5/2024",
    },
  ];
  // paginations 
  let data = []
  const pages = [1,2,3,4,5];
  for(let i = 1; i <= pages.length; i++){
     data.push(i);
  }

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl shadow-sm p-6 w-full border-slate-200 border">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Transactions
            </h2>
            <p className="text-sm text-gray-400">
              Manage your income and expenses
            </p>
          </div>

          <button className="flex items-center gap-2 bg-blue-700  text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-900">
            <GoPlus size={16} />
            Add Transaction
          </button>
        </div>

        {/* TABLE */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            
            {/* TABLE HEAD */}
            <thead className="font-semibold border-b">
              <tr>
                <th className="py-3 font-medium">Type</th>
                <th className="py-3 font-medium">Amount</th>
                <th className="py-3 font-medium">Category</th>
                <th className="py-3 font-medium">Description</th>
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {transactions.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  {/* TYPE */}
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        item.type === "income"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  {/* AMOUNT */}
                  <td
                    className={`font-medium ${
                      item.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.amount}
                  </td>

                  {/* CATEGORY */}
                  <td className="text-gray-600">{item.category}</td>

                  {/* DESCRIPTION */}
                  <td className="text-gray-500">{item.description}</td>

                  {/* DATE */}
                  <td className="text-gray-500">{item.date}</td>

                  {/* ACTIONS */}
                  <td className="flex justify-end gap-2 py-3">
                    <button className="p-2 border rounded-md hover:bg-gray-100">
                      <PiNotePencil size={14} />
                    </button>

                    <button className="p-2 border rounded-md hover:bg-gray-100">
                      <IoTrashOutline size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
      <div>
            <Paginations   
                 ClassNext={`px-3 py-3 text-[14px] cursor-pointer`}
                 ClassPrev={`px-3 py-3 text-[14px] cursor-pointer`}
                     Page={
                      data.map((item) => {
                            return (
                                     <Pages 
                                      ClassName={`px-4 py-2 bg-transparent text-slate-700 cursor-poin *:text-[18px]`}
                                      Components={item}/>
                                  )
                              })
                      }/>
      </div>

       <div className="flex justify-center mt-6 mb-3">
            <span className='text-gray-500 text-[12px]'> © 2026 Dana-Cermat. All Rights Reserved. Designed & Developed by Raffy_samaa.</span>
        </div> 
    </div>
  );
}
