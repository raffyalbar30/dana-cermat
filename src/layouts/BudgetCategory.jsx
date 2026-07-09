import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import { IoMdArrowDropdown } from "react-icons/io";
import { Addbudgets, Allcategorybudgets, Dellatebudgets, GetAllbudgets, UpdateBudgets } from "../services/api";
import { FiAlertTriangle } from "react-icons/fi";
import LoaderPage from "../component/LoaderPage";
import Toaster from "../component/Toaster";
import { LuNotebookPen } from "react-icons/lu";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";



export default function BudgetCategory() {
  
  const [ isOpenBudget, setisOpenBudget ] = useState(false);
  const [ isRenameBudget, setisRenameBudget ] = useState(false);
  const [ dropdown, setdropdown ] = useState(false); 
  const [ dropdownperiod, setdropdownperiod ] = useState(false);
  const [ categories, setcategories ] = useState([]); 
  const [ namecategories, setnamecategories ] = useState("Food");
  

  // form data category
  const [ idcategory, setidcategory ] = useState(); 
  const [ amount, setamount ] = useState(); 
  const [ periode, setperiode ] = useState("");
  const [ date, setdate ] = useState();

  // allBudgets data 
  const [ dataAllbudgets, setdataAllbudgets ] = useState([]);

  // dellated popup
  const [ dellateBudgets, setdellateBudgets ] = useState(false);

  // confirm update budget
  const [ confirmupdate, setconfirmupdate ] = useState(false); 
  
  // get value Budgets 
  const [ getIdBudgets, setgetIdBudgets ] = useState();
  const [ getIdCategory, setgetIdCategory ] = useState();
  const [ getnamecategories, setgetnamecategories ] = useState();
  const [ getperiod, setgetperiod ] = useState();
  const [ getamount, setgetamount ] = useState();
  const [ getstartdate, setgetstartdate ] = useState();
  const [ getEnddate, setgetEnddate ] = useState();


  // loader budgets 
  const [ loader, setloader ] = useState(false);

  // notifications 
  const [ notifications, setnotifications ] = useState(false);

 const token = localStorage.getItem("Token"); 

  const HandleOpenBudget = () => {
    return setisOpenBudget(true); 
  }

  const HandleRenameBudget = () => {
    return setisRenameBudget(true); 
  }

 const HandleRenamePopup = () => {
    setisRenameBudget(false);

    if (!getstartdate) {
        console.error("Start date kosong");
        return;
    }

    const startDate = new Date(getstartdate);
    let endDate = new Date(startDate);

    switch (getperiod) {
        case "threeday":
            endDate.setDate(endDate.getDate() + 3);
            break;

        case "weekly":
            endDate.setDate(endDate.getDate() + 7);
            break;

        case "monthly":
            endDate = new Date(
                startDate.getFullYear(),
                startDate.getMonth() + 1,
                0
            );
            break;

        case "yearly":
            endDate = new Date(
                startDate.getFullYear(),
                11,
                31
            );
            break;

        default:
            console.error("Periode tidak valid");
            return;
    }

    setgetEnddate(endDate);
    setconfirmupdate(true);
};

  const HandleCategories = async () => {
     try {
       const { response } = await Allcategorybudgets();
       setcategories(response); 
     } catch (error) {
       console.log(error); 
     }
  }
  
  const HandleAddBudget = async () => {
     setnotifications(true);

    try {

      const { response } = await Addbudgets(token, idcategory, amount, periode, date);
      setisOpenBudget(false);
      setloader(true);
      setTimeout(() => {
       setnotifications(false);
      }, 2800)

    } catch (error) {
      console.log(error);
    }

     setTimeout(() => {
      window.location.reload(); 
    }, 2900); 

  }

  const GetAllBudgets = async () => {
    setloader(true);
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
      setdellateBudgets(false)
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } catch (error) {
      console.log(error); 
    }

  }

  // belum bikin loading   
    const updateRenameBudgets = async () => {
        try {
        const { response } = await UpdateBudgets(
          getIdCategory,
          getamount ?? 0, 
          getperiod ?? "",
          getstartdate ?? null,
          getEnddate ?? null, 
          getIdBudgets
        );
        
        window.location.reload();
        } catch (error) {
          console.log(error);
        }
    }


  useEffect(() => {
    GetAllBudgets();
    HandleCategories(); 
  }, [])

  // loader 
   useEffect(() => {
      setTimeout(() => {
        setloader(false);
      }, 2000)
    }, [loader])
   

  return (
    <> 
        <div className={`${ notifications === true  ? "active" : "hidden"} flex justify-center`}>
         <Toaster className={`${notifications === true ? "dropdown" : ""} transition-all absolute z-10 top-0 mt-4 w-1/3 h-14`}
          stateNotif={() => setnotifications(false)} Title={"Data Budget telah ditambahkan!!"}></Toaster>
        </div>
    {
        isRenameBudget === true ? (
          <Modal isOpen={isRenameBudget}
          children={
           <div className={`transition-all ${isRenameBudget === true ? "dropdown" : "opacity-0 invisible"}`}>
                <div className="flex justify-between"> 
                        <div className="ml-4 mt-4"> 
                            <h2 className="text-lg font-semibold">Update Budgets</h2>
                              <p className="text-sm text-gray-500"> Update Your Budgets For Financial Stable</p>
                        </div>
                        <div className="mr-4 mt-4">
                            <button onClick={() => setisRenameBudget(false)}
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
                            <span>{getnamecategories}</span>
                            <span> <IoMdArrowDropdown/> </span>
                          </button>
                            <ul  className={`${ dropdown === true ? "dropdown" : "hidden"} absolute left-0 top-full mt-1 w-full bg-gray-50 border border-slate-400 rounded-md shadow z-50`}>
                           {
                             categories?.data?.map((items) => {
                                 return (
                                  <li data-value={items?.name_categories} onClick={(e) => {
                                    setgetIdCategory(items?.categories_id); 
                                    setdropdown(false)
                                    setgetnamecategories(e.target.dataset.value);
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
                            value={getamount.toLocaleString("id-ID")}
                            placeholder="Masukan jumlah nominal"
                            className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                            onChange={(e)=> setgetamount(e.target.value)}
                          />
                        </div>
                  </div>
    
                  <div className="flex-wrap mr-4">
                        <div className="full ml-4 mt-4">
                        <label className="text-sm text-gray-600">Periode Budgeting</label>
                        <div className="relative w-full mt-1">
                          <button onClick={()=> setdropdownperiod(true)} 
                          className="w-full flex justify-between items-center text-left p-2 border border-slate-400 rounded-md bg-gray-50">
                            <span>{!periode ? getperiod : "three day"}</span>
                            <span> <IoMdArrowDropdown/> </span>
                          </button>
                          <ul  className={`${ dropdownperiod === true ? "dropdown" : "hidden"} absolute left-0 top-full mt-1 w-full bg-gray-50 border border-slate-400 rounded-md shadow z-50`}>
                                  <li data-value="threeday" onClick={(e) => {
                                     setdropdownperiod(false)
                                     setgetperiod(e.target.dataset.value)}} 
                                   className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                                        three day
                                  </li>
                                  <li data-value="weekly" onClick={(e) => {
                                     setdropdownperiod(false)
                                     setgetperiod(e.target.dataset.value)}} 
                                  className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                                        weekly
                                  </li>
                                  <li data-value="monthly" onClick={(e) => {
                                     setdropdownperiod(false)
                                    setgetperiod(e.target.dataset.value)}} 
                                  className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                                        monthly
                                  </li>
                                  <li data-value="yearly" onClick={(e) => {
                                     setdropdownperiod(false)
                                     setgetperiod(e.target.dataset.value)}} 
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
                               value={getstartdate ? `${new Date(getstartdate).getFullYear()}-${String(new Date(getstartdate).getMonth() + 1)
                              .padStart(2, "0")}-${String(new Date(getstartdate).getDate()).padStart(2, "0")}`: ""}
                              className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                              onChange={(e) => setgetstartdate(e.target.value)}
                              />
                          </div>
                      </diV>
    
                      
                      <div className="mr-4">
                        <button onClick={() => HandleRenamePopup()}
                        type="submit" className={ ` flex gap-x-2 justify-center items-center w-full ml-4 mt-6 mb-2 bg-blue-700 disabled:bg-blue-600
                        cursor-pointer text-white py-2 rounded-md`}>
                            <span> Add Rename budgeting </span>
                        </button>
                        </div>

                      <div className="mr-4">
                        <button onClick={() => setisRenameBudget(false)}
                        type="submit" className={ ` flex gap-x-2 justify-center items-center w-full ml-4 mt-2 mb-6 bg-transparent border border-solid border-slate-300 disabled:bg-blue-600
                        cursor-pointer text-slate-700 py-2 rounded-md`}>
                            <span> Cancel Rename budgeting </span>
                        </button>
                      </div>
    
                  </div>
    
          </div>
                  
         }/> 
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
                            <span>{namecategories}</span>
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
       ) : confirmupdate === true ? (
            <div className={`fixed inset-0 pl-64 z-10 flex items-center justify-center bg-black/50 transition-all ${
                    confirmupdate
                              ? "dropdown"
                              : "opacity-0 invisible"
                          }`}
                        >
                          <div
                            className={`w-full max-w-xl rounded-2xl bg-white shadow-xl transition-all duration-300 ${
                              confirmupdate
                                ? "scale-100 opacity-100"
                                : "scale-95 opacity-0"
                            }`}
                          >
                            {/* Close Button */}
                            <button
                              onClick={() =>  {
                                window.location.reload;
                                setconfirmupdate(false)}}
                              className="absolute  cursor-pointer right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
                            >
                              ✕
                            </button>
            
                            <div className="p-8">
                              {/* Icon */}
                              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">
                                <LuNotebookPen
                                  size={36}
                                  className="text-blue-700"
                                />
                              </div>
            
                              {/* Heading */}
                              <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                                Confirm Transaction
                              </h2>
            
                              <p className="mt-2 text-center text-gray-500">
                                Please review the transaction details before updating.
                              </p>
            
                              {/* Detail Card */}
                              <div className="mt-8 rounded-xl border border-gray-200 p-5">
            
                                <div className="flex justify-between py-2">
                                  <span className="text-gray-500">Category</span>
                                  <span className="font-medium text-gray-800">
                                     {!getnamecategories ? getnamecategories : getnamecategories}
                                  </span>
                                </div>
            
                                <div className="flex justify-between py-2">
                                  <span className="text-gray-500">Amount</span>
                                  <span className="font-semibold text-gray-900">
                                     {Number(getamount).toLocaleString("id-ID")}
                                  </span>
                                </div>
            
                                <div className="flex justify-between py-2">
                                  <span className="text-gray-500">Start Date</span>
                                  <span className="font-medium text-gray-800">
                                      {getstartdate ? 
                                    `${new Date(getstartdate).getFullYear()}-${String(new Date(getstartdate).getMonth() + 1)
                                    .padStart(2, "0")}-${String(new Date(getstartdate).getDate()).padStart(2, "0")}`: ""}
                                  </span>
                                </div>

                                 <div className="flex justify-between py-2">
                                  <span className="text-gray-500">End Date</span>
                                  <span className="font-medium text-gray-800">
                                      {getEnddate ? 
                                    `${new Date(getEnddate).getFullYear()}-${String(new Date(getEnddate).getMonth() + 1)
                                    .padStart(2, "0")}-${String(new Date(getEnddate).getDate()).padStart(2, "0")}`: ""}
                                  </span>
                                </div>
            
                               
                              </div>
            
                              {/* Action */}
                              <div className="mt-8 flex flex-col gap-3">
                                <button
                                  onClick={()=> updateRenameBudgets()}
                                  className="rounded-xl cursor-pointer bg-blue-700 py-3 font-medium text-white transition hover:bg-blue-600"
                                >
                                  Confirms Update Budgets
                                </button>
            
                                <button
                                  onClick={() => setconfirmupdate(false)}
                                  className="rounded-xl border cursor-pointer border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50"
                                >
                                  Cancel Budgets
                                </button>
                              </div>
                            </div>
                          </div>
             </div>
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
              length: dataAllbudgets?.data?.length || 1,
            }).map((_, i) => (
              <div key={i} className={`w-full`}>
                <LoaderPage className="h-32"/>
              </div>
            ))
          ) : (
            dataAllbudgets?.data?.map((items, i) => (
               <BudgetCard key={i} 
               id_budgets={items?.id_budgets}
               categories_id={items?.categories_id}
               name_categories={items?.name_categories} 
               period={items?.period} 
               budget_amount={items?.budget_amount}
               start_date={items?.start_date}
               end_date={items?.end_date}
               used_amount={items?.used_amount}
               progressbar={items?.progress} 
               reminder={items?.remaining}
               setgetIdBudgets={setgetIdBudgets}
               setgetIdCategory={setgetIdCategory}
               setgetnamecategories={ setgetnamecategories}
               setgetperiod={setgetperiod} 
               setgetamount={setgetamount} 
               setgetstartdate={setgetstartdate} 
               setgetEnddate={setgetEnddate}
               setdellateBudgets={setdellateBudgets}
               setisRenameBudget={setisRenameBudget}
       
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
  categories_id,
  name_categories, 
  period, 
  budget_amount, 
  start_date, 
  end_date, 
  used_amount, 
  progressbar, 
  reminder,
  setgetIdBudgets, 
  setgetIdCategory,
  setgetnamecategories,
  setgetperiod, 
  setgetamount, 
  setgetstartdate,
  setgetEnddate, 
  setdellateBudgets, 
  setisRenameBudget, 
  setgetRenamecategories, 
  setgetRenameAmount, 
  }) {
 
    
  const DellatedPopup = () => { 
   setdellateBudgets(true);
  }

  const percent = Math.round(( used_amount / budget_amount) * 100);
  const remaining = budget_amount - used_amount;

  return (
       <div className="bg-white border border-gray-200 rounded-xl p-5">

              {/* Top */}
              <div className="flex justify-between items-start mb-4">

                <div>
                  <h3 className="font-medium">{name_categories}</h3>
                  <p className="text-xs text-gray-500">{period} Budget</p>
                  <p className="text-sm mt-1">
                    {` Total spend Rp. ${used_amount.toLocaleString("id-ID")}`} / <span>{`Budget Rp. ${budget_amount.toLocaleString("id-ID")}`}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center gap-1 text-sm px-2 py-1 rounded-md ${
                      percent > 100
                        ? "bg-red-600 text-white"
                        : percent === 100
                        ? "bg-green-500 text-white"
                        : percent >= 80
                        ? "bg-yellow-400 text-gray-600"
                        : percent > 0
                        ? "bg-blue-500 text-white"
                        : "hidden"
                    }`}
                  >
                    {percent > 100 ? (
                      <>
                        <IoWarningOutline size={18} />
                        <span>Danger</span>
                      </>
                    ) : percent === 100 ? (
                      <>
                        <IoIosCheckmarkCircleOutline size={18} />
                        <span>Success</span>
                      </>
                    ) : percent >= 80 ? (
                      <>
                        <IoWarningOutline size={18} />
                        <span>Warning</span>
                      </>
                    ) : percent > 0 ? (
                      <>
                        <IoIosCheckmarkCircleOutline size={18} />
                        <span>On Progress</span>
                      </>
                    ) : null}
                  </span>

                  <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                      {new Date(start_date).toLocaleDateString("id-ID")} - {new Date(end_date).toLocaleDateString("id-ID")}
                  </span>

                  <button onClick={()=> {
                    setisRenameBudget(true),
                    setgetIdBudgets(id_budgets), 
                    setgetIdCategory(categories_id),
                    setgetnamecategories(name_categories),
                    setgetperiod(period), 
                    setgetamount(budget_amount), 
                    setgetstartdate(start_date),
                    setgetEnddate(end_date)
                  }} className="p-2 border cursor-pointer rounded-md hover:bg-gray-50">
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
                  }} className="p-2 border cursor-pointer rounded-md hover:bg-gray-50">
                    <IoTrashOutline size={14}/>
                  </button>

                </div>
              </div>


              {/* Progress */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-blue-700 "
                  style={{ width: `${progressbar}%` }}
                />
              </div>


              {/* Bottom */}
              <div className="flex justify-between text-xs text-gray-500">
                <span className="text-amber-500 font-medium">
                  {percent === 100 || percent > 100 ? 100 : percent }%
                </span>

                <span>
              
                    {percent > 100 ? (
                      <span className="text-red-600">
                        Kamu sudah melewati Budget Rp. {reminder.toLocaleString("id-ID")}
                      </span>
                    ) : percent === 100 ? (
                      <span className="text-green-500">
                        Budget kamu sudah terpenuhi
                      </span>
                    ) : percent > 0 ? (
                      <span className="text-blue-700">
                        Sisa Budget Kamu Rp. {reminder.toLocaleString("id-ID")}
                      </span>
                    ) : (
                      <span>
                        On Progress Budget Kamu Rp. {reminder.toLocaleString("id-ID")}
                      </span>
                    )}
                 </span>
              
              </div>

      </div>
  );
}