import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import { IoMdArrowDropdown } from "react-icons/io";
import { Addbudgets, Allcategorybudgets, Dellatebudgets, GetAllbudgets } from "../services/api";
import { FiAlertTriangle } from "react-icons/fi";
import LoaderPage from "../component/LoaderPage";


export default function BudgetCategory() {
  
  const [ isOpenBudget, setisOpenBudget ] = useState(false);
  const [ isRenameBudget, setisRenameBudget ] = useState(false);
  const [ dropdown, setdropdown ] = useState(false); 
  const [ dropdownperiod, setdropdownperiod ] = useState(false);
  const [ categories, setcategories ] = useState([]); 
  const [ namecategories, setnamecategories ] = useState("");
  

  // form data category
  const [ idcategory, setidcategory ] = useState(); 
  const [ amount, setamount ] = useState(); 
  const [ periode, setperiode ] = useState("");
  const [ date, setdate ] = useState();

  // allBudgets data 
  const [ dataAllbudgets, setdataAllbudgets ] = useState([]);

  // dellated popup
  const [ dellateBudgets, setdellateBudgets ] = useState(false);
  
  // getIdBudgets categories
  const [ getIdBudgets, setgetIdBudgets ] = useState();
  const [ getnamecategories, setgetnamecategories ] = useState();
  const [ getperiod, setgetperiod ] = useState();
  const [ getamount, setgetamount ] = useState();
  const [ getstartdate, setgetstartdate ] = useState();
  const [ getEnddate, setgetEnddate ] = useState();

  // loader budgets 
  const [ loader, setloader ] = useState(false);


 const token = localStorage.getItem("Token"); 

  const HandleOpenBudget = () => {
    return setisOpenBudget(true); 
  }

  const HandleRenameBudget = () => {
    return setisRenameBudget(true); 
  }

  const HandleCategories = async () => {
     try {
       const { response } = await Allcategorybudgets();
       setcategories(response); 
     } catch (error) {
       console.log(error); 
     }
  }
  
  const HandleAddBudget = async () => {
    try {
      const { response } = await Addbudgets(token, idcategory, amount, periode, date);
      setisOpenBudget(false);
    } catch (error) {
      console.log(error);
    }

  }

  const GetAllBudgets = async () => {
    try {
      const { response } = await GetAllbudgets(token);
      setdataAllbudgets(response);
    } catch (error) {
      console.log(error);
    }
  }

  const HandleDellatebudgets = async (id) => {
    try {
      const { response } = await Dellatebudgets(id); 
    } catch (error) {
      console.log(error); 
    }

  }

  useEffect(() => {
    GetAllBudgets();
    HandleCategories(); 
  }, [])

  return (
    <> 
    {
      isRenameBudget === true ? (
        <p>heloo world</p>
      ) : dellateBudgets === true ?  (
           <div className={`fixed inset-0 pl-64 z-10 flex items-center justify-center bg-black/50 transition-all ${
                      dellateBudgets
                        ? "dropdown"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <div
                      className={`w-full max-w-xl rounded-2xl bg-white shadow-xl transition-all duration-300 ${
                        dellateBudgets
                          ? "scale-100 opacity-100"
                          : "scale-95 opacity-0"
                      }`}
                    >
                      {/* Close Button */}
                      <button
                        onClick={() => {
                          setdellateBudgets(false)}}
                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
                      >
                        ✕
                      </button>
      
                      <div className="p-8">
                        {/* Icon */}
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100">
                          <FiAlertTriangle
                            size={40}
                            className="text-red-600"
                          />
                        </div>
      
                        {/* Heading */}
                        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                          Delete Budgets
                        </h2>
      
                        <p className="mt-3 text-center text-gray-500">
                          Are you sure you want to delete this budgets?
                        </p>
      
                        
                        {/* Transaction Info */}
                        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
      
                          <div className="flex justify-between py-2">
                            <span className="text-gray-500">Category</span>
                            <span className="font-medium">{getnamecategories}</span>
                          </div>
      
                          <div className="flex justify-between py-2">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-semibold">
                              {getamount.toLocaleString("id-ID")}
                            </span>
                          </div>
      
                          <div className="flex justify-between py-2">
                            <span className="text-gray-500">Start Date</span>
                            <span>{new Date(getstartdate).toLocaleDateString("id-ID")}</span>
                          </div>

                           <div className="flex justify-between py-2">
                            <span className="text-gray-500">End Date</span>
                            <span>{new Date(getEnddate).toLocaleDateString("id-ID")}</span>
                          </div>
      
      
      
                        </div>
      
                        {/* Warning */}
                        <p className="mt-4 text-center text-sm text-red-500">
                          This action dellated budget cannot be undone.
                        </p>
      
                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3">
                          <button onClick={()=> HandleDellatebudgets(getIdBudgets)}
                            className="rounded-xl bg-red-600 py-3 cursor-pointer  font-medium text-white transition hover:bg-red-700"
                          >
                            Delete Transaction
                          </button>
      
                          <button onClick={()=> setdellateBudgets(false) }
                            className="rounded-xl border cursor-pointer  border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
           </div>
      ) : isOpenBudget === true ? (
          <Modal isOpen={isOpenBudget}
        children={
           <div className={`transition-all ${isOpenBudget === true ? "dropdown" : "opacity-0 invisible"}`}>
                <div className="flex justify-between"> 
                        <div className="ml-4 mt-4"> 
                            <h2 className="text-lg font-semibold">Add New Budget</h2>
                              <p className="text-sm text-gray-500"> Add a new budgeting for your financial stable </p>
                        </div>
                        <div className="mr-4 mt-4">
                            <button onClick={() => setisOpenBudget(false)}
                             className="text-gray-400  text-[18px] cursor-pointer hover:text-black"> ✕ </button>
                        </div>
                </div>
    
                  <div className="flex gap-x-4 items-center justify-between">
                          {/* Form create add */}
                      <div className="w-1/2 ml-4 mt-4">
                        <label className="text-sm text-gray-600">Categories</label>
                        <div className="relative w-full mt-1">
                          <button onClick={()=> setdropdown(true)} 
                          className="w-full flex justify-between items-center text-left p-2 border border-slate-400 rounded-md bg-gray-50">
                            <span>{!namecategories ? "Food" : namecategories}</span>
                            <span> <IoMdArrowDropdown/> </span>
                          </button>
                            <ul  className={`${ dropdown === true ? "dropdown" : "hidden"} absolute left-0 top-full mt-1 w-full bg-gray-50 border border-slate-400 rounded-md shadow z-50`}>
                           {
                             categories?.data?.map((items) => {
                                 return (
                                  <li data-value={items?.name_categories} onClick={(e) => {
                                    setidcategory(items?.categories_id);
                                    setdropdown(false)
                                    setnamecategories(e.target.dataset.value);
                                    }} className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                                        {items?.name_categories}
                                  </li>
                                 );
                             })
                           }
                            </ul>
                        </div>
                      </div>
    
                        <div className="w-1/2 mr-4 mt-4">
                          <label className="text-sm text-gray-600">Budget Amount</label>
                          <input
                            type="number"
                            placeholder="Masukan jumlah nominal"
                            className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                            onChange={(e)=> setamount(e.target.value)}
                          />
                        </div>
                  </div>
    
                  <div className="flex-wrap mr-4">
                        <div className="full ml-4 mt-4">
                        <label className="text-sm text-gray-600">Periode Budgeting</label>
                        <div className="relative w-full mt-1">
                          <button onClick={()=> setdropdownperiod(true)} 
                          className="w-full flex justify-between items-center text-left p-2 border border-slate-400 rounded-md bg-gray-50">
                            <span>{!periode ? "three day" : periode}</span>
                            <span> <IoMdArrowDropdown/> </span>
                          </button>
                          <ul  className={`${ dropdownperiod === true ? "dropdown" : "hidden"} absolute left-0 top-full mt-1 w-full bg-gray-50 border border-slate-400 rounded-md shadow z-50`}>
                                  <li data-value="threeday" onClick={(e) => {
                                     setdropdownperiod(false)
                                     setperiode(e.target.dataset.value)}} 
                                   className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                                        three day
                                  </li>
                                  <li data-value="weekly" onClick={(e) => {
                                     setdropdownperiod(false)
                                    setperiode(e.target.dataset.value)}} 
                                  className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                                        weekly
                                  </li>
                                  <li data-value="monthly" onClick={(e) => {
                                     setdropdownperiod(false)
                                    setperiode(e.target.dataset.value)}} 
                                  className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                                        monthly
                                  </li>
                                  <li data-value="yearly" onClick={(e) => {
                                     setdropdownperiod(false)
                                    setperiode(e.target.dataset.value)}} 
                                  className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                                        yearly
                                  </li>
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
                              onChange={(e) => setdate(e.target.value)}
                              />
                          </div>
                      </diV>
    
                      
                      <div className="mr-4">
                        <button onClick={() => HandleAddBudget()}
                        type="submit" className={ ` flex gap-x-2 justify-center items-center w-full ml-4 mt-6 mb-2 bg-blue-700 disabled:bg-blue-600
                        cursor-pointer text-white py-2 rounded-md`}>
                            <span> Add budgeting </span>
                        </button>
                        </div>

                      <div className="mr-4">
                        <button onClick={() => setisOpenBudget(false)}
                        type="submit" className={ ` flex gap-x-2 justify-center items-center w-full ml-4 mt-2 mb-6 bg-transparent border border-solid border-slate-300 disabled:bg-blue-600
                        cursor-pointer text-slate-700 py-2 rounded-md`}>
                            <span> Cancel budgeting </span>
                        </button>
                      </div>
    
                  </div>
    
          </div>
                  
         }/> 
        ) : null
    }
    
    <div className="w-full rounded-lg border border-slate-200 bg-slate-50 mt-8 mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        { 
          loader === true ? (
              <div className={`h-4 w-xs`}>
                 <LoaderPage className={`h-8`}/> 
              </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold">Budget Categories</h2>
              <p className="text-sm text-gray-500">
                Manage your spending limits by category
              </p>
            </div>
          )
        }

        {
          loader === true ? ( 
             <div className={`h-4 w-[200px]`}>
                 <LoaderPage className={`h-8`}/> 
              </div>
          ) : (
            <button 
              onClick={() => HandleOpenBudget()}
              className="bg-blue-700 cursor-pointer text-white text-sm px-4 py-2 rounded-lg hover:opacity-90">
                + Add Budget
            </button>
          )
        }
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {
          loader === true ? ( 
            Array.from({
              length: dataAllbudgets?.data?.length || 6,
            }).map((_, i) => (
              <div key={i} className={`w-full`}>
                <LoaderPage className="h-32"/>
              </div>
            ))
          ) : (
            dataAllbudgets?.data?.map((items, i) => (
               <BudgetCard key={i} 
               id_budgets={items?.id_budgets}
               name_categories={items?.name_categories} 
               period={items?.period} 
               budget_amount={items?.budget_amount}
               start_date={items?.start_date}
               end_date={items?.end_date}
               setgetIdBudgets={setgetIdBudgets}
               setgetnamecategories={ setgetnamecategories}
               setgetperiod={setgetperiod} 
               setgetamount={setgetamount} 
               setgetstartdate={setgetstartdate} 
               setgetEnddate={setgetEnddate}
               setdellateBudgets={setdellateBudgets}
               loader={loader}
               />
          )
          
        ))}
      </div>

    </div>
    </>
  );
}


function BudgetCard({ 
  id_budgets, 
  name_categories, 
  period, 
  budget_amount, 
  start_date, 
  end_date, 
  setgetIdBudgets, 
  setgetnamecategories,
  setgetperiod, 
  setgetamount, 
  setgetstartdate,
  setgetEnddate, 
  setdellateBudgets, 
  loader }) {
 
    
  const DellatedPopup = () => { 
   setdellateBudgets(true);
  }

  const percent = Math.round((4000 / budget_amount) * 100);
  const remaining = 4000 - budget_amount;

  return (
       <div className="bg-white border border-gray-200 rounded-xl p-5">

              {/* Top */}
              <div className="flex justify-between items-start mb-4">

                <div>
                  <h3 className="font-medium">{name_categories}</h3>
                  <p className="text-xs text-gray-500">{period} Budget</p>
                  <p className="text-sm mt-1">
                    {4000} / <span>{budget_amount.toLocaleString("id-ID")}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                    <IoWarningOutline size={12}/>
                    Warning
                  </span>

                  <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                      {new Date(start_date).toLocaleDateString("id-ID")} - {new Date(end_date).toLocaleDateString("id-ID")}
                  </span>

                  <button className="p-2 border rounded-md hover:bg-gray-50">
                    <PiNotePencil size={14} />
                  </button>

                  <button onClick={()=> {
                    setgetIdBudgets(id_budgets), 
                    setgetnamecategories(name_categories),
                    setgetperiod(period), 
                    setgetamount(budget_amount), 
                    setgetstartdate(start_date),
                    setgetEnddate(end_date)
                    DellatedPopup()
                  }} className="p-2 border rounded-md hover:bg-gray-50">
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
                  ${remaining.toLocaleString("id-ID")} remaining
                </span>
              </div>

            </div>
  );
}