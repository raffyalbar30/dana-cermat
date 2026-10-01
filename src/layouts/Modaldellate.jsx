import React from "react";
import Buttons from "../component/Buttons";
import { Dellatetransactions } from "../services/api";

const Modaldellate = ({
  setdellate,
  Icons,
  getDellateTransactions,
  loader,
  setloader,
  setTitle,
  setAlert,
}) => {
  const handleDellate = async () => {
    const Token = sessionStorage.getItem("Token");
    const id = getDellateTransactions.id_transaction;
    setloader(true);

    try {
      const { response } = await Dellatetransactions(Token, id);
      setTitle(response.data.message);
      setAlert(true);
      setdellate(false);
      setTimeout(() => {
        window.location.reload();
      }, 1800);
    } catch (error) {
      setTitle(error.response.data.message);
      setAlert(true);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setdellate(false);
        }}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 sm:right-5 sm:top-5 sm:h-10 sm:w-10"
      >
        ✕
      </button>

      <div className="p-4 sm:p-6 md:p-8">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 sm:h-20 sm:w-20">
          {Icons}
        </div>

        {/* Heading */}
        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900 sm:mt-6 sm:text-3xl">
          Delete Transaction
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500 sm:mt-3 sm:text-base">
          Are you sure you want to delete this transaction?
        </p>

        {/* Transaction Info */}
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 sm:mt-6 sm:p-4">
          <div className="flex items-center justify-between gap-3 py-2">
            <span className="text-sm text-gray-500 sm:text-base">Type</span>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium sm:px-3 sm:text-sm ${
                getDellateTransactions.type_categories === "Income"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {getDellateTransactions.type_categories}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 py-2">
            <span className="text-sm text-gray-500 sm:text-base">Category</span>

            <span className="max-w-[60%] text-right text-sm font-medium break-words sm:text-base">
              {getDellateTransactions.name_categories}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 py-2">
            <span className="text-sm text-gray-500 sm:text-base">Amount</span>

            <span className="text-right text-sm font-semibold sm:text-base">
              {getDellateTransactions.amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 py-2">
            <span className="text-sm text-gray-500 sm:text-base">Date</span>

            <span className="text-right text-sm sm:text-base">
              {getDellateTransactions.created_at
                ? `${new Date(
                    getDellateTransactions.created_at,
                  ).getFullYear()}-${String(
                    new Date(getDellateTransactions.created_at).getMonth() + 1,
                  ).padStart(2, "0")}-${String(
                    new Date(getDellateTransactions.created_at).getDate(),
                  ).padStart(2, "0")}`
                : ""}
            </span>
          </div>

          <div className="mt-3 border-t border-gray-300 pt-3">
            <p className="mb-1 text-sm text-gray-500 sm:text-base">
              Description
            </p>

            <p className="text-sm break-words text-gray-800 sm:text-base">
              {getDellateTransactions.descriptions}
            </p>
          </div>
        </div>

        {/* Warning */}
        <p className="mt-3 text-center text-xs text-red-500 sm:mt-4 sm:text-sm">
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:mt-8">
          <Buttons
            onClick={() => handleDellate()}
            Classparrent={"mt-2 sm:mt-4"}
            Classchild={"w-full"}
            disabled={loader}
            Classbutton={`
        w-full
        rounded-xl
        py-3
        text-base
        font-semibold
        text-white
        transition
        sm:text-lg
        ${
          loader
            ? "cursor-not-allowed bg-gray-400"
            : "cursor-pointer bg-[#3F47F4] hover:bg-[#333bd1]"
        }
      `}
            Title={
              loader ? (
                <div className="flex items-center justify-center gap-x-2">
                  <svg
                    width="24px"
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

                  <span className="text-sm text-white sm:text-base">
                    Loading
                  </span>
                </div>
              ) : (
                "Delete transaction"
              )
            }
          />

          <button
            onClick={() => setdellate(false)}
            className="w-full cursor-pointer rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:text-base"
          >
            Cancel delete transaction
          </button>
        </div>
      </div>
    </>
  );
};

export default Modaldellate;
