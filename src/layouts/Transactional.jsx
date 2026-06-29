import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import Paginations from "./Paginations";
import Pages from "../component/Pages";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import { IoMdArrowDropdown } from "react-icons/io";
import Toaster from "../component/Toaster";
import LoaderPage from "../component/LoaderPage";
import { FiAlertTriangle } from "react-icons/fi";
import { AddTransactions, Dellatetransactions, FormTransaksi, GetAlltransactions, Renametransactions } from "../services/api";
import { MdWindow } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import Notfound from "../component/Notfound";





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
  const [ confirmupdate, setconfirmupdate ] = useState(false);
  const [ Renametypecategories, setRenametypecategories ] = useState("");
  const [ renameCategory, setrenameCategory ] = useState([]);
  const [ RenameNameCategoris, setRenameNameCategoris ] = useState();
  const [ RenameIdTransactions, setRenameRenameIdTransactions ] = useState();
  const [ categoriespopup, setcategoriespopup ] = useState("");

  // state delate transactions 
  const [ dellate, setdellate ] = useState(false); 
  const [ getIdDellated, setgetIdDellated ] = useState(null);
  const [ typecategoriesdellated, settypecategoriesdellated ] = useState("");
  const [ namecategoriesdellated, setnamecategoriesdellated ] = useState("");
  const [ amountdellated, setamountdellated ] = useState(null);
  const [ descriptionsdellated, setdescriptionsdellated ] = useState("");
  const [ datedellated, setdatedellated ] = useState("");


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
  
  // done berhasil 
  const HandleAddTransaction = async () => {
    setnotifications(true);

    try {

    await AddTransactions(
      token,
      idCategory,
      amount,
      descriptions,
      date
    );

    setisOpen(false);
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

  const renamepopup = () => {
    setupdate(false);
    setconfirmupdate(true); 
  }

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
      const { response } = await Renametransactions(
        RenameIdTransactions,
        idCategory ?? 1,
        amount ?? 0,
        date ?? null,
        descriptions ?? ""
      );
      
      window.location.reload();
      } catch (error) {
        console.log(error);
      }
  }

  // pop-up delleted
  const dellatedpopup = async (
    items_id, 
    type_categories, 
    name_categories, 
    amount, 
    descriptions, 
    created_at) => {

      setdellate(true);
      setgetIdDellated(items_id);
      settypecategoriesdellated(type_categories);
      setnamecategoriesdellated(name_categories);
      setamountdellated(amount);
      setdescriptionsdellated(descriptions);
      setdatedellated(created_at);
  }

  const dellatetransactions = async () => {
    try {
      const { response } = await Dellatetransactions(getIdDellated); 
      // await getAlltransactions(Page?.pages || 1);
      setconfirmupdate(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000)
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
  }, []);

  useEffect(() => {
    Category(type);
  }, [type]);
  
  useEffect(() => {
    getrenamecategory();
  }, [Renametypecategories]);


  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 2000)
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
                    value={amount.toLocaleString("id-ID")}
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
                  renamepopup();
                }} 
                disabled={!amount || !getCategory || !date || loader}>
                {loader && ( <div className="w-4 h-4 border-4 border-t-white border-blue-300 rounded-full animate-spin"></div>)}
                     <span> update transactions </span>
                </button>
                </div>

           </div>

           </div>
          
            }/> ) : ( isOpen === true ? ( 
          // Modal add transactions 
            <Modal isOpen={isOpen} handleClick={handleClick} setisOpen={setisOpen}
              children={
                <div className={`transition-all ${isOpen === true ? "dropdown" : "opacity-0 invisible"}`}>
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
           ) : dellate === true ?  (
            <div className={`fixed inset-0 pl-64 z-10 flex items-center justify-center bg-black/50 transition-all ${
                dellate
                  ? "dropdown"
                  : "opacity-0 invisible"
              }`}
            >
              <div
                className={`w-full max-w-xl rounded-2xl bg-white shadow-xl transition-all duration-300 ${
                  dellate
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0"
                }`}
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    window.location.reload;
                    setdellate(false)}}
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
                    Delete Transaction
                  </h2>

                  <p className="mt-3 text-center text-gray-500">
                    Are you sure you want to delete this transaction?
                  </p>

                  
                  {/* Transaction Info */}
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">

                     <div className="flex justify-between py-2">
                      <span className="text-gray-500">Type</span>
                      <span className={ `rounded-full px-3 py-1 text-sm font-medium ${ typecategoriesdellated === "Income" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>
                        {typecategoriesdellated}
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Category</span>
                      <span className="font-medium">{namecategoriesdellated}</span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Amount</span>
                      <span className="font-semibold">
                        {amountdellated.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Date</span>
                      <span>{datedellated  ? 
                        `${new Date(datedellated).getFullYear()}-${String(new Date(datedellated).getMonth() + 1)
                        .padStart(2, "0")}-${String(new Date(datedellated).getDate()).padStart(2, "0")}`: ""}</span>
                    </div>

                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <p className="text-gray-500 mb-1">
                        Description
                      </p>
                      <p className="text-gray-800">
                         {descriptionsdellated}
                      </p>
                    </div>

                  </div>

                  {/* Warning */}
                  <p className="mt-4 text-center text-sm text-red-500">
                    This action cannot be undone.
                  </p>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col gap-3">
                    <button
                      onClick={() => dellatetransactions()}
                      className="rounded-xl bg-red-600 py-3 cursor-pointer  font-medium text-white transition hover:bg-red-700"
                    >
                      Delete Transaction
                    </button>

                    <button
                      onClick={() => setdellate(false)}
                      className="rounded-xl border cursor-pointer  border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                    setconfirmupdate(false) }}
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
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
                      <span className="text-gray-500">Type</span>
                      <span className={`rounded-full px-3 py-1 text-sm font-medium  ${Renametypecategories === "Income" ? "text-green-600 bg-green-300" : "text-red-600 bg-red-300"}`}>
                         {Renametypecategories}
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Category</span>
                      <span className="font-medium text-gray-800">
                         {!nameCategoris ? RenameNameCategoris : nameCategoris}
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Amount</span>
                      <span className="font-semibold text-gray-900">
                         {Number(amount).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium text-gray-800">
                          {date  ? 
                        `${new Date(date).getFullYear()}-${String(new Date(date).getMonth() + 1)
                        .padStart(2, "0")}-${String(new Date(date).getDate()).padStart(2, "0")}`: ""}
                      </span>
                    </div>

                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <p className="text-gray-500 mb-1">
                        Description
                      </p>
                      <p className="text-gray-800">
                          {descriptions}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-8 flex flex-col gap-3">
                    <button
                    onClick={() => updateRenametransactions()}
                      className="rounded-xl bg-blue-700 py-3 font-medium text-white transition hover:bg-blue-600"
                    >
                      Update Transaction
                    </button>

                    <button
                      onClick={() => setconfirmupdate(false)}
                      className="rounded-xl border border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null )
       }
      </div>
      
      {/* Table transcations */}
      <div className="relative z-0">
        <div className="bg-white rounded-xl shadow-sm p-6 w-full border-slate-200 border">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            { 
              
            loader === true ? (
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
            
            {
              loader === true ? (
              <div className={`mt-8 h-4 w-[200px]`}>
                <LoaderPage className={`h-8`}/> 
              </div> ) : (
            <button 
            disabled={loader === true}
            onClick={() =>  {
               setisOpen(true)
            }} className="flex items-center gap-2 bg-blue-700 disabled:bg-blue-400 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 hover:cursor-pointer">
              <GoPlus size={16} />
              Add Transaction
            </button>
            )
            }
          </div>

          {/* TABLE */}
          {
            loader === true ? (
              <div className={`mt-8 h-[300px] w-full`}>
              <LoaderPage className={`h-[300px] rounded-lg`}/> 
              </div>
            ) : (
              <div className="w-full z-0 overflow-x-auto">
                 {
                   AllTransactions.length === 0 ? (
                      <div className="w-full">
                        <Notfound />
                       </div>
                   ) : (
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
                              {item.amount.toLocaleString("id-ID")}
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
                              onClick={() => {
                                dellatedpopup(
                                  item.id_transaction, 
                                  item.type_categories, 
                                  item.name_categories, 
                                  item.amount, 
                                  item.descriptions, 
                                  item.created_at);
                              }}>
                                <IoTrashOutline size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                   )
                 }
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

        {/* footer */}
       <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
          <span className="text-gray-500 text-[12px] pl-52 whitespace-nowrap">
            © 2026 Dana-Cermat. All Rights Reserved. Designed & Developed by Raffy_samaa.
          </span>
        </div>
      </div>
    </>
  );
}

