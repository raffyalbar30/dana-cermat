import React from 'react';

const Modaldellate = ({setdellate, Icons, getDellateTransactions}) => {
    return (
        <>
            <button
                 onClick={() => {
                     window.location.reload;
                      setdellate(false);
                    }}
                     className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
                          >
                            ✕
                          </button>
            
                          <div className="p-8">
                            {/* Icon */}
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100">
                               {Icons}
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
                                <span
                                  className={`rounded-full px-3 py-1 text-sm font-medium ${getDellateTransactions.type_categories === "Income" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}
                                >
                                  {getDellateTransactions.type_categories}
                                </span>
                              </div>
            
                              <div className="flex justify-between py-2">
                                <span className="text-gray-500">Category</span>
                                <span className="font-medium">
                                  {getDellateTransactions.name_categories}
                                </span>
                              </div>
            
                              <div className="flex justify-between py-2">
                                <span className="text-gray-500">Amount</span>
                                <span className="font-semibold">
                                  {getDellateTransactions.amount}
                                </span>
                              </div>
            
                              <div className="flex justify-between py-2">
                                <span className="text-gray-500">Date</span>
                                <span>
                                   {getDellateTransactions.date
                                    ? `${new Date(getDellateTransactions.date).getFullYear()}-${String(
                                        new Date(getDellateTransactions.date).getMonth() + 1,
                                    ).padStart(
                                        2,
                                        "0",
                                    )}-${String(new Date(getDellateTransactions.date).getDate()).padStart(2, "0")}`
                                    : ""}
                                </span>
                              </div>
            
                              <div className="border-t border-gray-300 pt-3 mt-3">
                                <p className="text-gray-500 mb-1">Description</p>
                                <p className="text-gray-800">{getDellateTransactions.desc}</p>
                              </div>
                            </div>
            
                            {/* Warning */}
                            <p className="mt-4 text-center text-sm text-red-500">
                              This action cannot be undone.
                            </p>
            
                            {/* Actions */}
                            <div className="mt-8 flex flex-col gap-3">
                              <button
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
        </>
    );
}

export default Modaldellate;
