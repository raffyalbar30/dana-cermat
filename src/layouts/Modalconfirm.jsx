import React from 'react';

const Modalconfirm = ({ setconfirmupdate, Icons, getUpdateTransactions}) => {
    return (
        <>
             <button
                  onClick={() => {
                     window.location.reload;
                         setconfirmupdate(false);
                    }}
                    className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100">
                            ✕
             </button>
            
              <div className="p-8">
                            {/* Icon */}
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">
                               {Icons}
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
                                <span
                                  className={`rounded-full px-3 py-1 text-sm font-medium  ${getUpdateTransactions.budget === "Income" ? "text-white bg-green-300" : "text-white bg-red-300"}`}
                                >
                                 {getUpdateTransactions.budget}
                                </span>
                              </div>
            
                              <div className="flex justify-between py-2">
                                <span className="text-gray-500">Category</span>
                                <span className="font-medium text-gray-800">
                                    {getUpdateTransactions.categoris}
                                </span>
                              </div>
            
                              <div className="flex justify-between py-2">
                                <span className="text-gray-500">Amount</span>
                                <span className="font-semibold text-gray-900">
                                   {getUpdateTransactions.amount}
                                </span>
                              </div>
            
                              <div className="flex justify-between py-2">
                                <span className="text-gray-500">Date</span>
                                <span className="font-medium text-gray-800">
                                   {getUpdateTransactions.date}
                                </span>
                              </div>
            
                              <div className="border-t border-gray-300 pt-3 mt-3">
                                <p className="text-gray-500 mb-1">Description</p>
                                <p className="text-gray-800"> {getUpdateTransactions.desc}</p>
                              </div>
                            </div>
            
                            {/* Action */}
                            <div className="mt-8 flex flex-col gap-3">
                              <button
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
        </>
    );
}

export default Modalconfirm;
