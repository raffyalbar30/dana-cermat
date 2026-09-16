import React from 'react';

const ModalUpdateBudget = ({setconfirmupdate, Icons, dataBudget}) => {
    return (
         <div>
              {/* Close Button */}
                         <button
                           onClick={() => {
                             window.location.reload;
                             setconfirmupdate(false);
                           }}
                           className="absolute  cursor-pointer right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
                         >
                           ✕
                         </button>
             
                         <div className="p-8">
                           {/* Icon */}
                           <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">
                             <LuNotebookPen size={36} className="text-blue-700" />
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
                               <span className="text-gray-500">Category</span>
                               <span className="font-medium text-gray-800">
                                 {!getnamecategories ? getnamecategories : getnamecategories}
                               </span>
                             </div>
             
                             <div className="flex justify-between py-2">
                               <span className="text-gray-500">Amount</span>
                               <span className="font-semibold text-gray-900">
                                 {Number(getamount).toLocaleString("id-ID")}
                               </span>
                             </div>
             
                             <div className="flex justify-between py-2">
                               <span className="text-gray-500">Start Date</span>
                               <span className="font-medium text-gray-800">
                                 {getstartdate
                                   ? `${new Date(getstartdate).getFullYear()}-${String(
                                       new Date(getstartdate).getMonth() + 1,
                                     ).padStart(
                                       2,
                                       "0",
                                     )}-${String(new Date(getstartdate).getDate()).padStart(2, "0")}`
                                   : ""}
                               </span>
                             </div>
             
                             <div className="flex justify-between py-2">
                               <span className="text-gray-500">End Date</span>
                               <span className="font-medium text-gray-800">
                                 {getEnddate
                                   ? `${new Date(getEnddate).getFullYear()}-${String(
                                       new Date(getEnddate).getMonth() + 1,
                                     ).padStart(
                                       2,
                                       "0",
                                     )}-${String(new Date(getEnddate).getDate()).padStart(2, "0")}`
                                   : ""}
                               </span>
                             </div>
                           </div>
             
                           {/* Action */}
                           <div className="mt-8 flex flex-col gap-3">
                             <button
                               onClick={() => updateRenameBudgets()}
                               className="rounded-xl cursor-pointer bg-blue-700 py-3 font-medium text-white transition hover:bg-blue-600"
                             >
                               Confirms Update Budgets
                             </button>
             
                             <button
                               onClick={() => setconfirmupdate(false)}
                               className="rounded-xl border cursor-pointer border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50"
                             >
                               Cancel Budgets
                             </button>
                           </div>
                         </div>
         </div>
    );
}

export default ModalUpdateBudget;
