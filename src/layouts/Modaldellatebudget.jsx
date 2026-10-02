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
        className="
    absolute right-3 top-3
    md:right-5 md:top-5
    flex h-8 w-8 md:h-10 md:w-10
    items-center justify-center
    rounded-lg
    border border-gray-200
    text-sm md:text-base
    text-gray-500
    transition
    hover:bg-gray-100
  "
      >
        ✕
      </button>

      <div className="p-5 sm:p-6 md:p-8">
        {/* Icon */}
        <div
          className="
      mx-auto
      flex
      h-16 w-16
      sm:h-18 sm:w-18
      md:h-20 md:w-20
      items-center
      justify-center
      rounded-2xl
      bg-red-100
    "
        >
          <FiAlertTriangle size={32} className="text-red-600 md:size-[40px]" />
        </div>

        {/* Heading */}
        <h2
          className="
      mt-5 md:mt-6
      text-center
      text-2xl sm:text-3xl
      font-bold
      text-gray-900
    "
        >
          Delete Budget
        </h2>

        <p
          className="
      mt-2 md:mt-3
      text-center
      text-sm sm:text-base
      leading-relaxed
      text-gray-500
    "
        >
          Are you sure you want to delete this budget?
        </p>

        {/* Budget Info */}
        <div
          className="
      mt-5 md:mt-6
      rounded-xl
      border border-red-200
      bg-red-50
      p-3 sm:p-4
    "
        >
          <div className="flex items-center justify-between gap-4 py-2">
            <span className="shrink-0 text-sm sm:text-base text-gray-500">
              Category
            </span>

            <span className="min-w-0 truncate text-right text-sm sm:text-base font-medium text-gray-900">
              {getnamecategories}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-2">
            <span className="shrink-0 text-sm sm:text-base text-gray-500">
              Periode
            </span>

            <span className="text-right text-sm sm:text-base font-medium text-gray-900">
              {getperiod}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-2">
            <span className="shrink-0 text-sm sm:text-base text-gray-500">
              Amount
            </span>

            <span className="text-right text-sm sm:text-base font-semibold text-gray-900">
              {getamount.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-2">
            <span className="shrink-0 text-sm sm:text-base text-gray-500">
              Start Date
            </span>

            <span className="text-right text-sm sm:text-base text-gray-900">
              {new Date(getstartdate).toLocaleDateString("id-ID")}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-2">
            <span className="shrink-0 text-sm sm:text-base text-gray-500">
              End Date
            </span>

            <span className="text-right text-sm sm:text-base text-gray-900">
              {new Date(getEnddate).toLocaleDateString("id-ID")}
            </span>
          </div>
        </div>

        {/* Warning */}
        <p
          className="
      mt-3 md:mt-4
      px-2
      text-center
      text-xs sm:text-sm
      leading-relaxed
      text-red-500
    "
        >
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-6 md:mt-8 flex flex-col gap-3">
          <Buttons
            onClick={() => handleDellate()}
            Classparrent="mt-2 md:mt-4"
            Classchild="w-full"
            disabled={loader}
            Classbutton={`
        w-full
        rounded-xl
        py-3
        text-base sm:text-lg
        font-semibold
        text-white
        transition
        ${
          loader
            ? "cursor-not-allowed bg-red-400"
            : "cursor-pointer bg-red-600 hover:bg-red-700"
        }
      `}
            Title={
              loader ? (
                <div className="flex items-center justify-center gap-x-2">
                  <svg
                    width="22px"
                    fill="white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                      opacity=".25"
                    />

                    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,1,1.49-1.3A8,8,0,0,1,12,4Z">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="0.75s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>

                  <span className="text-sm sm:text-base">Loading</span>
                </div>
              ) : (
                "Delete Budget"
              )
            }
          />

          <button
            onClick={() => setdellateBudgets(false)}
            className="
        w-full
        rounded-xl
        border border-gray-200
        py-3
        text-sm sm:text-base
        font-medium
        text-gray-700
        transition
        cursor-pointer
        hover:bg-gray-50
      "
          >
            Cancel Delete Budget
          </button>
        </div>
      </div>
    </>
  );
};

export default Modaldellatebudget;
