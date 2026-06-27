import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { useState } from "react";
import Modal from "../component/Modal";
import { IoMdArrowDropdown } from "react-icons/io";


export default function BudgetCategory() {
  
  const [ isOpenBudget, setisOpenBudget ] = useState(false);
  
  const HandleOpenBudget = () => {
    return setisOpenBudget(true); 
  }

  console.log(isOpenBudget); 

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
    <> 

    <Modal isOpen={isOpenBudget}
        children={
           <div className={`transition-all ${isOpenBudget === true ? "dropdown" : "opacity-0 invisible"}`}>
                <div className="flex justify-between"> 
                        <div className="ml-4 mt-4"> 
                            <h2 className="text-lg font-semibold">Add New Budget</h2>
                              <p className="text-sm text-gray-500"> Add a new budgeting for your financial stable </p>
                        </div>
                        <div className="mr-4 mt-4">
                            <button  className="text-gray-400  text-[18px] cursor-pointer hover:text-black"> ✕ </button>
                        </div>
                </div>
    
                  <div className="flex gap-x-4 items-center justify-between">
                          {/* Form create add */}
                      <div className="w-1/2 ml-4 mt-4">
                        <label className="text-sm text-gray-600">Categories</label>
                        <div className="relative w-full mt-1">
                          <button  className="w-full flex justify-between items-center text-left p-2 border border-slate-400 rounded-md bg-gray-50">
                            <span>Transport</span>
                            <span> <IoMdArrowDropdown/> </span>
                          </button>
                        </div>
                      </div>
    
                        <div className="w-1/2 mr-4 mt-4">
                          <label className="text-sm text-gray-600">Budget Amount</label>
                          <input
                            type="number"
                            placeholder="Masukan jumlah nominal"
                            className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                          />
                        </div>
                  </div>
    
                  <div className="flex-wrap mr-4">
                        <div className="full ml-4 mt-4">
                        <label className="text-sm text-gray-600">Periode Budgeting</label>
                        <div className="relative w-full mt-1">
                          <button className="w-full flex justify-between items-center text-left p-2 border border-slate-400 rounded-md bg-gray-50">
                            <span> <IoMdArrowDropdown/> </span>
                          </button>
                              <ul  className={` absolute left-0 top-full mt-1 w-full bg-gray-50 border border-slate-400 rounded-md shadow z-50`}>
                                  {/* {
                                    getCategory?.map((items) => {
                                        return (
                                          <li data-value={items?.name_categories} onClick={(e) => {
                                            setdropdownCategory(false)
                                            setidCategory(items?.categories_id)
                                            setnameCategories(e.target.dataset.value); 
                                            }} className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                                                {items?.name_categories}
                                          </li>
                                        );
                                    })
                                  } */}
                              </ul>
                        </div>
                      </div>
    
                      {/* Date */}
                      <diV className="mr-4">
                          <div className="w-full ml-4 mt-4">
                            <label className="text-sm text-gray-600">Start Date</label>
                            <input
                              type="date"
                              className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                              />
                          </div>
                      </diV>
    
                      
                      <div className="mr-4">
                        <button type="submit" className={ ` flex gap-x-2 justify-center items-center w-full ml-4 mt-6 mb-2 bg-blue-700 disabled:bg-blue-600
                        cursor-pointer text-white py-2 rounded-md`}>
                            <span> Add budgeting </span>
                        </button>
                        </div>

                      <div className="mr-4">
                        <button type="submit" className={ ` flex gap-x-2 justify-center items-center w-full ml-4 mt-2 mb-6 bg-transparent border border-solid disabled:bg-blue-600
                        cursor-pointer text-slate-700 py-2 rounded-md`}>
                            <span> Cancle Budgeting </span>
                        </button>
                      </div>
    
                  </div>
    
          </div>
                  
     }/> 
    
    <div className="w-full rounded-lg border border-slate-200 bg-slate-50 mt-8 mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Budget Categories</h2>
          <p className="text-sm text-gray-500">
            Manage your spending limits by category
          </p>
        </div>

        <button 
        onClick={() => HandleOpenBudget()}
        className="bg-blue-700 cursor-pointer text-white text-sm px-4 py-2 rounded-lg hover:opacity-90">
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
    </>
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