import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import Paginations from "./Paginations";
import Pages from "../component/Pages";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import { AddTransactions, FormTransaksi, GetAlltransactions } from "../services/api";
import { IoMdArrowDropdown } from "react-icons/io";
import Toaster from "../component/Toaster";




export default function Transactional() {
 
  // State untuk dropdown selected
  const [ isOpen, setisOpen ] = useState(false); 
  const [ dropdowntype, setdropdowntype ] = useState(false); 
  const [ dropdownCategory, setdropdownCategory ] = useState(false); 

  // State menu
  const [ type, settype ] = useState("Expanses");
  const [ idCategory, setidCategory ] = useState();
  const [ nameCategoris, setnameCategories ] = useState(); 
  const [ amount, setamount ] = useState();
  const [ descriptions, setdescriptions ] = useState(""); 
  const [ date, setdate ] = useState();
  const [ getCategory, setGetCategory ] = useState([]); 
  const [ AllTransactions, setAllTransactions ] = useState([]);

  // State loader 
  const [ loader, setloader ] = useState(false); 
  const [ notifications, setnotifications ] = useState(false);

  // state Paginations 
  const [ Page, setPage ] = useState([]); 
  const [ active, setactive ] = useState();
  const [ nextPage, setnextPage ] = useState(1);

  const token = localStorage.getItem("Token"); 

  const handleClick = () => {
    setisOpen(true);
  }

  const Category = async () => {
  try {
    const { response } = await FormTransaksi(type);
    setGetCategory(response.data);
  } catch (error) {
    console.log(error);
  }
  }

  const HandleAddTransaction = async () => {

   const delay = (ms) => new Promise(res => setTimeout(res, ms));
   setloader(true);

    try {

      await Promise.all([
        AddTransactions(token, idCategory, amount, descriptions, date),
        delay(700) 
      ]);

      setTimeout(() => {
        setnotifications(false);
      }, 2500); 

    } catch (error) {
      console.log(error);
    } finally {
      setloader(false);
  }
  }
 
  const getAlltransactions = async (pages) => {
     try {

      const { response } = await GetAlltransactions(token, pages); 
      setAllTransactions(response.data);
      setPage(response.data.paginations); 

     } catch (error) {
       console.log(error); 
     }
  }

  const handlePagination = async (page) => {
     try {
       const pages = await getAlltransactions(page);
     } catch (error) {
       console.log(error)
     }
  }

     
 const handleNextPages = async () => {
   if (Page.pages === Page?.endPage) {
      return;
   }

   const newPage = Page.pages + 1;

   setnextPage(newPage);

   try {
      await getAlltransactions(newPage);
   } catch (error) {
      console.log(error);
   }
 };

  const handlePrevPages = async () => {
   if (Page.pages <= 1 ) {
      return;
   }

   const newPage = Page.pages - 1;

   setnextPage(newPage);

   try {
      await getAlltransactions(newPage);
   } catch (error) {
      console.log(error);
   }

  }

  // paginations 
  let data = []
  for(let i = 1; i <= Page?.endPage; i++){
     data.push(i);
  }



  useEffect(() => {
    Category();
    getAlltransactions();
   }, [type]);

 

  return (
    <>
    <div className={`${ notifications === true ? "active" : "hidden"} flex justify-center`}>
     <Toaster className={`${notifications === true ? "dropdown" : ""} transition-all absolute z-10 top-0 mt-4 w-1/3 h-14`}
      stateNotif={() => setnotifications(false)}></Toaster>
    </div>

      <div className="mt-18">
        <Modal isOpen={isOpen} handleClick={handleClick} setisOpen={setisOpen}
         children={
             <div className={`transition-all ${isOpen === true ? "dropdown" : "dropdownout"}`}>
              <div className="flex justify-between"> 
                <div className="ml-4 mt-4"> 
                    <h2 className="text-lg font-semibold">Add New Transaction</h2>
                      <p className="text-sm text-gray-500"> Add a new income or expense transaction.</p>
                </div>
                <div className="mr-4 mt-4">
                    <button onClick={() => setisOpen(false)}  className="text-gray-400  text-[18px] cursor-pointer hover:text-black"> ✕ </button>
                </div>
              </div>

           <div className="flex gap-x-4 items-center justify-between">
                  {/* Form create add */}
              <div className="w-1/2 ml-4 mt-4">
                 <label className="text-sm text-gray-600">Type</label>
                 <div className="relative w-full mt-1">
                  <button onClick={() => setdropdowntype(true)} className="w-full flex justify-between items-center text-left p-2 border border-slate-400 rounded-md bg-gray-50">
                    <span>{type}</span>
                    <span> <IoMdArrowDropdown/> </span>
                  </button>
                  <ul className={`${dropdowntype === true ? "dropdown"  : "hidden"}  absolute 
                     left-0 top-full mt-1 w-full bg-gray-50 border border-slate-400 rounded-md shadow z-50`}>
                    <li data-value="Income" onClick={(e) => {
                         setdropdowntype(false), 
                         settype(e.target.dataset.value);
                    }} className="px-4 py-2 hover:bg-slate-100 flex justify-between cursor-pointer">
                      Income <span>💰</span>
                    </li>
                    <li data-value="Expanses" onClick={(e) => {
                      setdropdowntype(false), 
                      settype(e.target.dataset.value)
                      }} className="px-4 py-2 hover:bg-gray-100 flex justify-between cursor-pointer">
                      Expense <span>💸</span>
                    </li>
                  </ul>
                 </div>
               </div>

                <div className="w-1/2 mr-4 mt-4">
                  <label className="text-sm text-gray-600">Amount</label>
                  <input
                    type="number"
                    placeholder="Masukan jumlah nominal"
                    className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                    onChange={(e) => setamount(e.target.value)}/>
                </div>
           </div>

           <div className="flex-wrap mr-4">
                 <div className="full ml-4 mt-4">
                 <label className="text-sm text-gray-600">Category</label>
                 <div className="relative w-full mt-1">
                  <button onClick={() => setdropdownCategory(true)} className="w-full flex justify-between items-center text-left p-2 border border-slate-400 rounded-md bg-gray-50">
                    {!nameCategoris ? "Pilih Category" : nameCategoris}
                    <span> <IoMdArrowDropdown/> </span>
                  </button>
                      <ul  className={`${ dropdownCategory === true ? "dropdown" : "hidden"} absolute left-0 top-full mt-1 w-full bg-gray-50 border border-slate-400 rounded-md shadow z-50`}>
                           {
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
                           }
                      </ul>
                 </div>
               </div>

               {/* Date */}
              <diV className="mr-4">
                  <div className="w-full ml-4 mt-4">
                    <label className="text-sm text-gray-600">Date</label>
                    <input
                      type="date"
                      className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                      onChange={(e) => setdate(e.target.value)}/>
                  </div>
              </diV>

              {/* Descriptions */}
              <div className="mr-4">
                  <div className="w-full ml-4 mt-4">
                    <label className="text-sm text-gray-600">Description</label>
                    <textarea
                      type="text"
                      className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                      placeholder="Masukan deskripsi disini"
                      onChange={(e) =>  setdescriptions(e.target.value)}/>
                  </div>
              </div>
              
              <div className="mr-4">
                <button type="submit" className={ ` flex gap-x-2 justify-center items-center w-full ml-4 mt-6 mb-6 bg-blue-700 disabled:bg-blue-500
                cursor-pointer text-white py-2 rounded-md`}
                onClick={() => {
                   setisOpen(false);
                   setnotifications(true);
                   HandleAddTransaction();
                }} 
                disabled={!amount || !getCategory || !date || loader}>
                {loader && ( <div className="w-4 h-4 border-4 border-t-white border-blue-300 rounded-full animate-spin"></div>)}
                     <span> Add Transaction </span>
                </button>
                </div>

           </div>

             </div>
          
         }/>
      </div>

      {/* Table transcations */}
      <div className="relative z-0">
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

            <button onClick={() =>  {
               setisOpen(true)
            }} className="flex items-center gap-2 bg-blue-700  text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 hover:cursor-pointer">
              <GoPlus size={16} />
              Add Transaction
            </button>
          </div>

          {/* TABLE */}
          <div className="w-full z-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
              
              {/* TABLE HEAD */}
              <thead className="font-semibold border-b border-slate-400">
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
                {AllTransactions?.data?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b  border-slate-400 last:border-none hover:bg-gray-50"
                  >
                    {/* TYPE */}
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium
                        ${
                          item.type_categories === "Income"
                            ? "bg-green-600 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {item.type_categories}
                      </span>
                    </td>

                    {/* AMOUNT */}
                    <td
                      className={`font-medium ${
                        item.type_categories === "Income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.amount}
                    </td>

                    {/* CATEGORY */}
                    <td className="text-gray-600">{item.name_categories}</td>

                    {/* DESCRIPTION */}
                    <td className="text-gray-500">{item.descriptions}</td>

                    {/* DATE */}
                    <td className="text-gray-500">{new Date(item.created_at).toLocaleDateString("id-ID")}</td>

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
                  ClassNext={`px-3 py-3 text-[14px] cursor-pointer ${Page.pages === Page.endPage ? "hidden" : "active"}`}
                  ClassPrev={`px-3 py-3 text-[14px] cursor-pointer ${Page.pages === 1 ? "hidden" : "active"}`}
                  NextPage={() => handleNextPages()}
                  PrevPage={() => handlePrevPages()}
                      Page={
                        data.map((item) => {
                              return (
                                      <Pages 
                                        ClassName={`${item === Page.pages ? "bg-blue-700 text-white" : "bg-transparent text-slate-700"} px-4 py-2  cursor-pointer text-[18px] rounded-md`}
                                        Components={item} HandleClick={() => handlePagination(item)}/>
                                    )
                                })
                }/>
        </div>
        <div className="flex justify-center mt-6 mb-3">
              <span className='text-gray-500 text-[12px]'> © 2026 Dana-Cermat. All Rights Reserved. Designed & Developed by Raffy_samaa.</span>
          </div> 
      </div>
    </>
  );
}



