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
import {
  AddTransactions,
  Dellatetransactions,
  GetAlltransactions,
  Renametransactions,
} from "../services/api";
import { MdWindow } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import Notfound from "../component/Notfound";
import { FcMoneyTransfer } from "react-icons/fc";
import ToasterModal from "../../utils/ToasterModal";
import AddFormTransactions from "./AddFromTransactions";
import UpdateTransactions from "./UpdateFormTransactions";
import ToasterModalConfirm from "../../utils/ToasterModalConfirm";
import Modalconfirm from "./Modalconfirm";
import Modaldellate from "./Modaldellate";
import ToasterModalDellate from "../../utils/ToastrModalDellate";

export default function Transactional() {
  // state title toaster
  const [alert, setalert] = useState(false);
  const [title, settitle] = useState("");

  // State untuk dropdown selected
  const [isOpen, setisOpen] = useState(false);
  // state update transactions
  const [updatetransactions, setupdatetransactions] = useState(false);

  // State untuk get updateTransactions & get dellateTransactions
  const [ getUpdateTransactions, setgetUpdateTransactions ] = useState([]);
  const [ getDellateTransactions, setgetDellateTransactions ] = useState([]);

  // State menu
  const [AllTransactions, setAllTransactions] = useState([]);

  // State loader
  const [loader, setloader] = useState(false);

  // state Paginations
  const [Page, setPage] = useState([]);
  const [active, setactive] = useState();
  const [nextPage, setnextPage] = useState(1);

  const [confirmupdate, setconfirmupdate] = useState(false);
  const [renameid, setrenameid] = useState();
  const [renametypeid, setrenametypeid ] = useState();
  const [renametypebudget, setrenametypebudget] = useState("");
  const [renamecategory, setrenamecategory] = useState([]);
  const [renameamount, setrenameamount] = useState();
  const [renamedescriptions, setrenamedescriptions] = useState("");
  const [renamedate, setrenamedate] = useState("");
  

  // state delate transactions
  const [dellate, setdellate] = useState(false);
 
  const token = sessionStorage.getItem("Token");

  const handleClick = () => {
    setisOpen(true);
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
      console.log(error);
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
    if (Page.pages <= 1) {
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

  // paginations
  let data = [];
  for (let i = 1; i <= Page?.endPage; i++) {
    data.push(i);
  }

  useEffect(() => {
    getAlltransactions();
  }, []);

  // ini intiloadernya
  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 2000);
  }, [loader]);

  setTimeout(() => {
    setalert(false);
  }, 1300);
  
  
  return (
    <>
      <div
        className={`${alert === true ? "active" : "hidden"} flex justify-center`}
      >
        <Toaster
          className={`${alert === true ? "dropdown" : ""} transition-all absolute z-10 top-0 mt-4 w-1/3 h-14`}
          stateNotif={() => setnotifications(false)}
          Title={title}
        ></Toaster>
      </div>

      {/* Modal transactions */}
      <div className="mt-18">
        {updatetransactions === true ? (
          // Modal rename transactions
          <ToasterModal
            isOpen={updatetransactions}
            setisOpen={setupdatetransactions}
            Icons={<LuNotebookPen size={70} className="text-blue-700" />}
            Title={"Rename your transactions"}
            describeTitle={
              "Update your transaction names to keep your records easy to understand."
            }
            FormsAddTransactions={
            <UpdateTransactions 
            setgetUpdateTransactions={setgetUpdateTransactions}
            typebudget={renametypebudget} 
            setrenametypeid={setrenametypeid}
            typecategoris={renamecategory}  
            amount={renameamount}
            date={renamedate} 
            description={renamedescriptions}
            setupdatetransactions={setupdatetransactions}
            setconfirmupdate={setconfirmupdate}
            />}
          />
        ) : isOpen === true ? (
          // Modal add transactions
          <ToasterModal
            isOpen={isOpen}
            handleClick={handleClick}
            setisOpen={setisOpen}
            Icons={<FcMoneyTransfer size={700} />}
            Title={"Add your transactions"}
            describeTitle={
              "Make changes to your transaction details and keep your financial records accurate."
            }
            FormsAddTransactions={
              <AddFormTransactions
                setAlert={setalert}
                setTitle={settitle}
                setIsOpen={setisOpen}
              />
            }
          />
        ) : dellate === true ? (
          <ToasterModalDellate
          dellatedconfim={dellate}
          Chilldren={<Modaldellate
            setdellate={setdellate}
            Icons={<FiAlertTriangle size={40} className="text-red-600" />}
            getDellateTransactions={getDellateTransactions}
          />}/>
        ) : confirmupdate === true ? (
            <ToasterModalConfirm 
            confirmupdate={confirmupdate}
            Chilldren={<Modalconfirm 
              renameid={renameid}
              renametypeid={renametypeid}
              loader={loader}
              setloader={setloader}
              setconfirmupdate={setconfirmupdate}
              Icons={<LuNotebookPen size={40} className="text-blue-700" />}
              getUpdateTransactions={getUpdateTransactions}
              />}
            />
        ) : null}
      </div>

      {/* Table transcations */}
      <div className="relative z-0">
        <div className="bg-white rounded-xl shadow-sm p-6 w-full border-slate-200 border">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            {loader === true ? (
              <div className={`mt-8 h-4 w-xs`}>
                <LoaderPage className={`h-8`} />
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

            {loader === true ? (
              <div className={`mt-8 h-4 w-[200px]`}>
                <LoaderPage className={`h-8`} />
              </div>
            ) : (
              <button
                disabled={loader === true}
                onClick={() => {
                  setisOpen(true);
                }}
                className="flex items-center gap-2 bg-blue-700 disabled:bg-blue-400 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 hover:cursor-pointer"
              >
                <GoPlus size={16} />
                Add Transaction
              </button>
            )}
          </div>

          {/* TABLE */}
          {loader === true ? (
            <div className={`mt-8 h-[300px] w-full`}>
              <LoaderPage className={`h-[300px] rounded-lg`} />
            </div>
          ) : (
            <div className="w-full z-0 overflow-x-auto">
              {AllTransactions.length === 0 ? (
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
                        <td className="text-gray-600">
                          {item.name_categories}
                        </td>

                        {/* DESCRIPTION */}
                        <td className="text-gray-500">{item.descriptions}</td>

                        {/* DATE */}
                        <td className="text-gray-500">
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                          )}
                        </td>

                        {/* ACTIONS */}
                        <td className="flex justify-end gap-2 py-3">
                          <button
                            className="p-2 border rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setrenameid(item.id_transaction);
                              setrenametypebudget(item.type_categories);
                              setrenamecategory(item.name_categories);
                              setrenameamount(item.amount);
                              setrenamedate(item.created_at);
                              setrenamedescriptions(item.descriptions);
                              setupdatetransactions(true);
                            }}
                          >
                            <PiNotePencil size={14} />
                          </button>

                          <button 
                            className="p-2 border rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setdellate(true)
                               setgetDellateTransactions(item)
                            }}
                          >
                            <IoTrashOutline size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
        <div>
          {loader === true ? (
            <div className={`mt-4 h-4 w-xs float-right`}>
              <LoaderPage className={`h-8 `} />
            </div>
          ) : (
            <Paginations
              ClassNext={`px-3 py-3 text-[14px] cursor-pointer ${Page.pages === Page.endPage ? "hidden" : "active"}`}
              ClassPrev={`px-3 py-3 text-[14px] cursor-pointer ${Page.pages === 1 ? "hidden" : "active"}`}
              NextPage={() => handleNextPages()}
              PrevPage={() => handlePrevPages()}
              Page={data.map((item) => {
                return (
                  <Pages
                    ClassName={`${item === Page.pages ? "bg-blue-700 text-white" : "bg-transparent text-slate-700"} px-4 py-2  cursor-pointer text-[18px] rounded-md`}
                    Components={item}
                    HandleClick={() => handlePagination(item)}
                  />
                );
              })}
            />
          )}
        </div>

        {/* footer */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
          <span className="text-gray-500 text-[12px] pl-52 whitespace-nowrap">
            © 2026 Dana-Cermat. All Rights Reserved. Designed & Developed by
            Raffy_samaa.
          </span>
        </div>
      </div>
    </>
  );
}
