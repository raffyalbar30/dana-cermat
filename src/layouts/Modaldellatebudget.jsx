import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Dellatebudgets } from "../services/api";
import Buttons from "../component/Buttons";

const Modaldellatebudget = ({
  setdellateBudgets,
  getIdBudgets,
  setallert,
  settitle,
  loader,
  setloader,
  getnamecategories,
  getperiod,
  getamount,
  getstartdate,
  getEnddate,
}) => {
  const token = sessionStorage.getItem("Token");

  const handleDellate = async () => {
    setloader(true);
    try {
      const { response } = await Dellatebudgets(token, getIdBudgets);
      settitle(response.data.message);
      setallert(true);
      setdellateBudgets(false);
      setTimeout(() => {
        window.location.reload();
      }, 1800);
    } catch (error) {
      settitle(error.response.data.message);
      setallert(true);
    }
  };
  return (
    <>
      {/* Close Button */}
      <button
        onClick={() => {
          setdellateBudgets(false);
        }}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
      >
        ✕
      </button>

      <div className="p-8">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100">
          <FiAlertTriangle size={40} className="text-red-600" />
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
            <span className="text-gray-500">Periode</span>
            <span className="font-medium">{getperiod}</span>
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
          <Buttons
            onClick={() => handleDellate()}
            Classparrent={"mt-4"}
            Classchild={"w-full"}
            disabled={loader}
            Classbutton={`
                 w-full bg-red-600 ${loader === true ? "disabled:cursor-not-allowed" : "bg-[#3F47F4] cursor-pointer "} transition text-white py-3 rounded-xl text-lg font-semibold`}
            Title={
              loader === true ? (
                <div className="flex justify-center items-center gap-x-2">
                  <svg
                    width={"24px"}
                    fill="white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />
                    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="0.75s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                  <span className="text-white text-md">Loading</span>
                </div>
              ) : (
                "Delete Budget"
              )
            }
          />

          <button
            onClick={() => setdellateBudgets(false)}
            className="rounded-xl border cursor-pointer  border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel Delete Budget
          </button>
        </div>
      </div>
    </>
  );
};

export default Modaldellatebudget;
