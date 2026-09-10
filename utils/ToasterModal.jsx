import React from 'react'
import Modal from '../src/component/Modal';

export default function ToasterModal({ 
    isOpen,
    handleClick, 
    setisOpen,
    Icons, 
    Title, 
    describeTitle,
    FormsAddTransactions }) {

  return (
      <Modal isOpen={isOpen} handleClick={handleClick} setisOpen={setisOpen}>
        <div className={`flex items-center justify-center`}>
        <div className={`relative w-full mt-8 h-[700px] max-h-[85vh] overflow-y-auto rounded-2xl transition-all duration-300 `}>
            {/* Close Button */}
            <button
            onClick={()=> setisOpen(false)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg border 
            border-gray-200 text-gray-500 hover:bg-gray-100"> ✕
            </button>

            <div className="p-8">
            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 p-4 items-center justify-center bg-blue-100 rounded-2xl">
                {Icons}
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                {Title}
            </h2>
            <div className='mx-auto w-[400px]'>
                <p className="mt-2 text-[18px] mx-auto text-center text-sm text-gray-500">
                    {describeTitle}
                </p>
            </div>
              { FormsAddTransactions }
            </div>
        </div>
        </div>
      </Modal>
  )
}
