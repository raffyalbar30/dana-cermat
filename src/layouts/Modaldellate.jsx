import React from 'react';
import Buttons from '../component/Buttons';

const Modaldellate = ({
  setdellate, 
  Icons, 
  getDellateTransactions,
  loader, 
  setloader, 
  setTitle,
  setAlert}) => {
    
    const handleDellate = async () => {
      const Token = sessionStorage.getItem("Token");
      const id = getDellateTransactions.id_transaction;
      setloader(true);

      try {
        const { response } = await Dellatetransactions(Token, id); 
        console.log(response);
         setTitle(response.data.message); 
         setAlert(true);
         setdellate(false);
      } catch (error) {
         setTitle(error.response.data.message); 
         setAlert(true);
      }
    }

    return (
        <>
            <button
                 onClick={() => {
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
                                  {getDellateTransactions.amount.toLocaleString("id-ID", 
                                    {
                                      style: "currency",
                                      currency: "IDR",
                                    })}
                                </span>
                              </div>
            
                              <div className="flex justify-between py-2">
                                <span className="text-gray-500">Date</span>
                                <span>
                                   {getDellateTransactions.created_at
                                    ? `${new Date(getDellateTransactions.created_at).getFullYear()}-${String(
                                        new Date(getDellateTransactions.created_at).getMonth() + 1,
                                    ).padStart(
                                        2,
                                        "0",
                                    )}-${String(new Date(getDellateTransactions.created_at).getDate()).padStart(2, "0")}`
                                    : ""}
                                </span>
                              </div>
            
                              <div className="border-t border-gray-300 pt-3 mt-3">
                                <p className="text-gray-500 mb-1">Description</p>
                                <p className="text-gray-800">{getDellateTransactions.descriptions}</p>
                              </div>
                            </div>
            
                            {/* Warning */}
                            <p className="mt-4 text-center text-sm text-red-500">
                              This action cannot be undone.
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
                                 Title={ loader === true ? (
                                    <div className='flex justify-center items-center gap-x-2'> 
                                     <svg width={"24px"} fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
                                       <span className='text-white text-md'>Loading</span>
                                     </div>
                                        ) : "Delete transactions"}/>
            
                              <button
                                onClick={() => setdellate(false)}
                                className="rounded-xl border cursor-pointer  border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50"
                              >
                                Cancel delete transaction
                              </button>
                            </div>
                          </div>
        </>
    );
}

export default Modaldellate;
