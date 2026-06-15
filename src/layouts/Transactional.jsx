import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import Paginations from "./Paginations";
import Pages from "../component/Pages";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import { AddTransactions, Dellatetransactions, FormTransaksi, GetAlltransactions, Renametransactions } from "../services/api";
import { IoMdArrowDropdown } from "react-icons/io";
import Toaster from "../component/Toaster";
import LoaderPage from "../component/LoaderPage";




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

  // state update transactions 
  const [ update, setupdate ] = useState(false); 
  const [ Renametypecategories, setRenametypecategories ] = useState("");
  const [ renameCategory, setrenameCategory ] = useState([]);
  const [ RenameNameCategoris, setRenameNameCategoris ] = useState();
  const [ RenameIdTransactions, setRenameRenameIdTransactions ] = useState();

  const token = localStorage.getItem("Token"); 


  const handleClick = () => {
    setisOpen(true);
  };

  const Category = async (data) => {
  try {
    const { response } = await FormTransaksi(data);
    setGetCategory(response.data);
  } catch (error) {
    console.log(error);
  }
  };

  const HandleAddTransaction = async () => {
    try {
    setnotifications(true);
    setloader(true);
    await AddTransactions(
      token,
      idCategory,
      amount,
      descriptions,
      date
    );
    
    await getAlltransactions(Page?.pages || 1);

    setTimeout(() => {
       setnotifications(false);
    }, 2500)

  } catch (error) {
    console.log(error);
  } 
  };
 
  // key loader
  const getAlltransactions = async (pages) => {
    setloader(true);

    try {
      const { response } = await GetAlltransactions(token, pages); 
      setAllTransactions(response.data);
      setPage(response.data.paginations); 

     } catch (error) {
       console.log(error); 
     } 

  };

  const handlePagination = async (page) => {
    await getAlltransactions(page);
     try {
       const pages = await getAlltransactions(page);
     } catch (error) {
       console.log(error)
     }
  };
 
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

  };

  const getrenamecategory = async () => {
    try {
      const { response } = await FormTransaksi(Renametypecategories);
      setrenameCategory(response.data);
    } catch (error) {
       console.log(error);
    }
  }

  const renametransactions = async (
  id_transaction, 
  type_categories, 
  name_categories,  
  amount, 
  descriptions,
  created_at) => {
  

   setRenameRenameIdTransactions(id_transaction);
   setRenametypecategories(type_categories);
   setRenameNameCategoris(name_categories);
   setamount(amount);
   setdescriptions(descriptions);
   setdate(created_at);
  
  }; 
 
// belum bikin loading   
 const updateRenametransactions = async () => {
   
    try {

     if (!RenameIdTransactions) {
      console.log("ID transaksi belum ada");
      return;
    }

     const { response } = await Renametransactions(
      RenameIdTransactions,
      idCategory ?? 1,
      amount ?? 0,
      date ?? null,
      descriptions ?? ""
     );

    } catch (error) {
      console.log(error);
    }
 }

 const dellatetransactions = async (id) => {
   try {
     const { response } = await Dellatetransactions(id); 
     await getAlltransactions(Page?.pages || 1);
   } catch (error) {
     console.log(error);
   }
 }

  // paginations 
  let data = []
  for(let i = 1; i <= Page?.endPage; i++){
     data.push(i);
  }
  
  useEffect(() => {;
    getAlltransactions();
    renametransactions();
  }, []);

  useEffect(() => {
    Category(type);
  }, [type]);
  
  useEffect(() => {
    getrenamecategory();
  }, [Renametypecategories]);

  useEffect(() => {
    setTimeout(() =>{
      updateRenametransactions();
    }, 1000)
  }, [RenameIdTransactions, RenameNameCategoris])

  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 2500)
  }, [loader])
    

  return (
    <>
    <div className={`${ notifications === true  ? "active" : "hidden"} flex justify-center`}>
     <Toaster className={`${notifications === true ? "dropdown" : ""} transition-all absolute z-10 top-0 mt-4 w-1/3 h-14`}
      stateNotif={() => setnotifications(false)}></Toaster>
    </div>
      
      {/* Modal transactions */}
      <div className="mt-18">
       {
          update === true ? (
          // Modal rename transactions 
          <Modal isOpen={update} handleClick={handleClick} setisOpen={setupdate}
          children={
             <div className={`transition-all ${update === true ? "dropdown" : "dropdownout"}`}>
              <div className="flex justify-between"> 
                <div className="ml-4 mt-4"> 
                    <h2 className="text-lg font-semibold">Update Transaction</h2>
                      <p className="text-sm text-gray-500"> Update new income or expanses ur transactions</p>
                </div>
                <div className="mr-4 mt-4">
                    <button onClick={() => setupdate(false)}  className="text-gray-400  text-[18px] cursor-pointer hover:text-black"> ✕ </button>
                </div>
              </div>

           <div className="flex gap-x-4 items-center justify-between">
            
            {/* Form create add */}
              <div className="w-1/2 ml-4 mt-4">
                 <label className="text-sm text-gray-600">Type</label>
                 <div className="relative w-full mt-1">
                  <button onClick={() => setdropdowntype(true)} className="w-full flex justify-between items-center text-left p-2 border border-slate-400 rounded-md bg-gray-50"
                    disabled={update === true}>
                    <span className="text-slate-600">{Renametypecategories}</span>
                  </button>
                 </div>
               </div>

                <div className="w-1/2 mr-4 mt-4">
                  <label className="text-sm text-gray-600">Amount</label>
                  <input
                    type="number"
                    placeholder="Masukan jumlah nominal"
                    value={amount}
                    className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                    onChange={(e) => setamount(e.target.value)}
                    />
                </div>
           </div>

           <div className="flex-wrap mr-4">
             <div className="full ml-4 mt-4">
                 <label className="text-sm text-gray-600">Category</label>
                 <div className="relative w-full mt-1">
                  <button onClick={() => setdropdownCategory(true)} className="w-full flex justify-between items-center text-left p-2 border border-slate-400 rounded-md bg-gray-50">
                    {!nameCategoris ? RenameNameCategoris : nameCategoris}
                    <span> <IoMdArrowDropdown/> </span>
                  </button>
                      <ul  className={`${ dropdownCategory === true ? "dropdown" : "hidden"} absolute left-0 top-full mt-1 w-full bg-gray-50 border border-slate-400 rounded-md shadow z-50`}>
                           {
                             renameCategory?.map((items) => {
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
                      value={ date ? 
                        `${new Date(date).getFullYear()}-${String(new Date(date).getMonth() + 1)
                        .padStart(2, "0")}-${String(new Date(date).getDate()).padStart(2, "0")}`: ""}
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
                      value={descriptions}
                      className="w-full mt-1 p-2 border border-slate-400 focus:outline-blue-600 rounded-md bg-gray-50"
                      placeholder="Masukan deskripsi disini"
                      onChange={(e) =>  setdescriptions(e.target.value)}/>
                  </div>
              </div>
              
              <div className="mr-4">
                <button type="submit" className={ ` flex gap-x-2 justify-center items-center w-full ml-4 mt-6 mb-6 bg-blue-700 disabled:bg-blue-500
                cursor-pointer text-white py-2 rounded-md`}
                onClick={() => {
                  updateRenametransactions();
                }} 
                disabled={!amount || !getCategory || !date || loader}>
                {loader && ( <div className="w-4 h-4 border-4 border-t-white border-blue-300 rounded-full animate-spin"></div>)}
                     <span> update Transaction </span>
                </button>
                </div>

           </div>

           </div>
          
            }/> 
           ) : ( isOpen === true ? ( 
          // Modal add transactions 
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
                  <button type="submit" className={ ` flex gap-x-2 justify-center items-center w-full ml-4 mt-6 mb-6 bg-blue-700 disabled:bg-blue-600
                  cursor-pointer text-white py-2 rounded-md`}
                  onClick={() => {
                    setisOpen(false);
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

          ): null )
       }
      </div>
      
      {/* Table transcations */}
      <div className="relative z-0">
        <div className="bg-white rounded-xl shadow-sm p-6 w-full border-slate-200 border">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            { loader === true ? (
              <div className={`mt-8 h-4 w-xs`}>
                <LoaderPage className={`h-8`}/> 
              </div>
            ) : (
             <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Transactions
              </h2>
              <p className="text-sm text-gray-400">
                Manage your income and expenses
              </p>
            </div>
            )}

            <button 
            disabled={loader === true}
            onClick={() =>  {
               setisOpen(true)
            }} className="flex items-center gap-2 bg-blue-700 disabled:bg-blue-400 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 hover:cursor-pointer">
              <GoPlus size={16} />
              Add Transaction
            </button>
          </div>

          {/* TABLE */}
          {
            loader === true ? (
              <div className={`mt-8 h-[300px] w-full`}>
              <LoaderPage className={`h-[300px]`}/> 
              </div>
            ) : (
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
                          <button className="p-2 border rounded-md hover:bg-gray-100 cursor-pointer" 
                          onClick={() => { 
                              setupdate(true); 
                              renametransactions(
                                item.id_transaction, 
                                item.type_categories, 
                                item.name_categories, 
                                item.amount, 
                                item.descriptions, 
                                item.created_at
                              );
                            }}>
                            <PiNotePencil size={14} />
                          </button>

                          <button className="p-2 border rounded-md hover:bg-gray-100 cursor-pointer"
                          onClick={() => dellatetransactions(item.id_transaction)}>
                            <IoTrashOutline size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )
          }


        </div>
        <div>
          {
            loader === true ? (
              <div className={`mt-4 h-4 w-xs float-right`}>
                <LoaderPage className={`h-8 `}/>
              </div>
            ) : (
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
            )
          }
        </div>
       <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
          <span className="text-gray-500 text-[12px] pl-52 whitespace-nowrap">
            © 2026 Dana-Cermat. All Rights Reserved. Designed & Developed by Raffy_samaa.
          </span>
        </div>
      </div>
    </>
  );
}



 