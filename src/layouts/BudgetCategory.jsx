import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  Addbudgets,
  Allcategorybudgets,
  Dellatebudgets,
  GetAllbudgets,
  UpdateBudgets,
} from "../services/api";
import { FiAlertTriangle } from "react-icons/fi";
import LoaderPage from "../component/LoaderPage";
import Toaster from "../component/Toaster";
import { LuNotebookPen } from "react-icons/lu";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import ToasterModal from "../../utils/ToasterModal";
import { CiMoneyCheck1 } from "react-icons/ci";
import AddFromAddBudget from "./AddFromAddBudget";
import UpdateFromAddBudget from "./UpdateFromBudget";
import ToasterModalConfirm from "../../utils/ToasterModalConfirm";
import ModalUpdateBudget from "./ModalUpdateBudget";
import ToasterModalDellate from "../../utils/ToasterModalDellate";
import Modaldellatebudget from "./Modaldellatebudget";

export default function BudgetCategory() {
  // Modal budgets
  const [isOpenBudget, setisOpenBudget] = useState(false);
  const [isRenameBudget, setisRenameBudget] = useState(false);

  // text
  const [title, settitle] = useState("");
  const Token = sessionStorage.getItem("Token");

  // loader budgets
  const [loader, setloader] = useState(false);
  const [confirmloader, setconfirmloader] = useState(false);

  // confirmupdate
  const [getconfirmupdate, setgetconfirmupdate] = useState([]);
  const [confirmupdate, setconfirmupdate] = useState(false);

  const [categories, setcategories] = useState([]);

  // allBudgets data
  const [dataAllbudgets, setdataAllbudgets] = useState([]);

  // dellated popup
  const [dellateBudgets, setdellateBudgets] = useState(false);

  // get value Budgets
  const [getIdBudgets, setgetIdBudgets] = useState();
  const [getIdCategory, setgetIdCategory] = useState();
  const [getnamecategories, setgetnamecategories] = useState();
  const [getperiod, setgetperiod] = useState();
  const [getamount, setgetamount] = useState();
  const [getstartdate, setgetstartdate] = useState();
  const [getEnddate, setgetEnddate] = useState();

  // notifications
  const [notifications, setnotifications] = useState(false);

  const HandleOpenBudget = () => {
    return setisOpenBudget(true);
  };

  const HandleCategories = async () => {
    try {
      const { response } = await Allcategorybudgets();
      setcategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllBudgets = async () => {
    setloader(true);
    try {
      const { response } = await GetAllbudgets(Token);
      setdataAllbudgets(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllBudgets();
    HandleCategories();
  }, []);

  // loader
  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 2000);
  }, []);

  return (
    <>
      {/* Notification */}
      <div
        className={`${
          notifications === true ? "flex" : "hidden"
        } justify-center px-4`}
      >
        <Toaster
          className={`
      ${notifications === true ? "dropdown" : ""}
      transition-all
      absolute
      z-50
      top-0
      mt-4
      w-[90%]
      sm:w-[70%]
      md:w-1/2
      lg:w-1/3
      h-14
    `}
          stateNotif={() => setnotifications(false)}
          Title={title}
        />
      </div>

      {/* Rename Budget */}
      {isRenameBudget === true ? (
        <ToasterModal
          isOpen={isRenameBudget}
          setisOpen={setisRenameBudget}
          Title={"Rename Budget"}
          describeTitle={
            "Set clear boundaries for your money and watch your progress in real time"
          }
          Icons={<GiReceiveMoney size={70} className="text-blue-700" />}
          FormsAddTransactions={
            <UpdateFromAddBudget
              setisOpen={setisRenameBudget}
              category={categories}
              loader={confirmloader}
              setloader={setconfirmloader}
              getIdBudgets={getIdBudgets}
              getIdCategory={getIdCategory}
              getperiod={getperiod}
              getamount={getamount}
              getstartdate={getstartdate}
              setgetconfirmupdate={setgetconfirmupdate}
              setpopupconfirmupdate={setconfirmupdate}
            />
          }
        />
      ) : dellateBudgets === true ? (
        <ToasterModalDellate
          dellatedconfim={dellateBudgets}
          Chilldren={
            <Modaldellatebudget
              setdellateBudgets={setdellateBudgets}
              getIdBudgets={getIdBudgets}
              setallert={setdellateBudgets}
              settitle={settitle}
              loader={confirmloader}
              setloader={setconfirmloader}
              getnamecategories={getnamecategories}
              getperiod={getperiod}
              getamount={getamount}
              getstartdate={getstartdate}
              getEnddate={getEnddate}
            />
          }
        />
      ) : isOpenBudget === true ? (
        <ToasterModal
          isOpen={isOpenBudget}
          setisOpen={setisOpenBudget}
          Title={"Add your budgeting"}
          describeTitle={
            "Make informed decisions for your budgeting and reach your financial goals faster"
          }
          Icons={<CiMoneyCheck1 size={70} className="text-blue-700" />}
          FormsAddTransactions={
            <AddFromAddBudget
              category={categories}
              loader={loader}
              setloader={setloader}
              settitle={settitle}
              setAlert={setnotifications}
              setisOpenBudget={setisOpenBudget}
            />
          }
        />
      ) : confirmupdate === true ? (
        <ToasterModalConfirm
          confirmupdate={confirmupdate}
          Chilldren={
            <ModalUpdateBudget
              setconfirmupdate={setconfirmupdate}
              Icons={<GiReceiveMoney size={45} className="text-blue-700" />}
              dataBudget={getconfirmupdate}
              loader={confirmloader}
              setloader={setconfirmloader}
              settitle={settitle}
              setnotifications={setnotifications}
            />
          }
        />
      ) : null}

      {/* Main Budget Container */}
      <div
        className="
    w-full
    max-w-full
    rounded-lg
    border
    border-slate-200
    bg-slate-50
    mt-6
    sm:mt-8
    mx-auto
    p-4
    sm:p-5
    md:p-6
  "
      >
        {/* Header */}
        <div
          className="
      flex
      flex-col
      sm:flex-row
      sm:justify-between
      sm:items-center
      gap-4
      mb-6
    "
        >
          {/* Title */}
          {loader === true ? (
            <div className="h-8 w-full sm:w-[250px]">
              <LoaderPage className="h-8 w-full" />
            </div>
          ) : (
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold">
                Budget Categories
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Manage your spending limits by category
              </p>
            </div>
          )}

          {/* Add Budget Button */}
          {loader === true ? (
            <div className="h-8 w-full sm:w-[160px]">
              <LoaderPage className="h-8 w-full" />
            </div>
          ) : (
            <div className="relative">
            <button
              onClick={() => HandleOpenBudget()}
              className="
                     right-1 absolute sm:relative sm:right-0
                      flex items-center justify-center gap-1
                      bg-blue-700
                      text-white
                      text-[11px] sm:text-sm
                      px-2.5 py-1.5
                      sm:px-4 sm:py-2
                      rounded-lg
                      hover:bg-blue-800
                      transition-all
                      shrink-0
        "
            >
              + Add Budget
            </button>
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="space-y-4 mt-12 md:mt-0 ">
          {loader === true
            ? Array.from({
                length: dataAllbudgets?.data?.length || 1,
              }).map((_, i) => (
                <div key={i} className="w-full">
                  <LoaderPage className="h-32 w-full rounded-lg" />
                </div>
              ))
            : dataAllbudgets?.data?.map((items, i) => (
                <BudgetCard
                  key={i}
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
                  setgetnamecategories={setgetnamecategories}
                  setgetperiod={setgetperiod}
                  setgetamount={setgetamount}
                  setgetstartdate={setgetstartdate}
                  setgetEnddate={setgetEnddate}
                  setdellateBudgets={setdellateBudgets}
                  setisRenameBudget={setisRenameBudget}
                />
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
  };

  const percent = Math.round((used_amount / budget_amount) * 100);
  const remaining = budget_amount - used_amount;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      {/* Top */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-[12px] md:text-base">{name_categories}</h3>
          <p className="md:text-xs text-[10px] text-gray-500">{period} Budget</p>
          <p className="md:text-sm text-[6px]  mt-1">
            {` Total spend Rp. ${used_amount.toLocaleString("id-ID")}`} /{" "}
            <span>{`Budget Rp. ${budget_amount.toLocaleString("id-ID")}`}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
          className={`flex items-center gap-1 text-[8px] sm:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${
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
      <IoWarningOutline className="w-2 h-2 sm:w-[18px] sm:h-[18px]" />
      <span>Danger</span>
    </>
  ) : percent === 100 ? (
    <>
      <IoIosCheckmarkCircleOutline className="w-2 h-2 sm:w-[18px] sm:h-[18px]" />
      <span>Success</span>
    </>
  ) : percent >= 80 ? (
    <>
      <IoWarningOutline className="w-2 h-2 sm:w-[18px] sm:h-[18px]" />
      <span>Warning</span>
    </>
  ) : percent > 0 ? (
    <>
      <IoIosCheckmarkCircleOutline className="w-2 h-2 sm:w-[18px] sm:h-[18px]" />
      <span>Progress</span>
    </>
  ) : null}
          </span>

          <div className="flex items-center gap-1 text-[8px] md:text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600 whitespace-nowrap">
            <span>{new Date(start_date).toLocaleDateString("id-ID")} -{" "}</span>
            <span>{new Date(end_date).toLocaleDateString("id-ID")}</span>
         </div>

          <button
          onClick={() => {
            (
              setisRenameBudget(true),
              setgetIdBudgets(id_budgets),
              setgetIdCategory(categories_id),
              setgetnamecategories(name_categories),
              setgetperiod(period),
              setgetamount(budget_amount),
              setgetstartdate(start_date),
              setgetEnddate(end_date)
            );
          }}
          className="p-1.5 sm:p-2 border cursor-pointer rounded-md hover:bg-gray-50"
        >
          <PiNotePencil className="w-2 h-2 sm:w-[14px] sm:h-[14px]" />
        </button>

        <button
            onClick={() => {
              (
                setgetIdBudgets(id_budgets),
                setgetnamecategories(name_categories),
                setgetperiod(period),
                setgetamount(budget_amount),
                setgetstartdate(start_date),
                setgetEnddate(end_date)
              );
              DellatedPopup();
            }}
            className="p-1.5 sm:p-2 border cursor-pointer rounded-md hover:bg-gray-50"
          >
            <IoTrashOutline className="w-2 h-2 sm:w-[14px] sm:h-[14px]" />
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
          {percent === 100 || percent > 100 ? 100 : percent}%
        </span>

        <span>
          {percent > 100 ? (
            <span className="text-red-600">
              Kamu sudah melewati Budget Rp. {reminder.toLocaleString("id-ID")}
            </span>
          ) : percent === 100 ? (
            <span className="text-green-500">Budget kamu sudah terpenuhi</span>
          ) : percent > 0 ? (
            <span className="text-blue-700">
              Sisa Budget Kamu Rp. {reminder.toLocaleString("id-ID")}
            </span>
          ) : (
            <span>
              Budget yang kamu siapkan Rp. {reminder.toLocaleString("id-ID")}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
