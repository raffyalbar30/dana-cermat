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
        <div className="flex items-center justify-center px-3 sm:px-4">
  <div
    className="
      relative mt-4 w-full
      max-w-xl
      max-h-[85vh]
      overflow-y-auto
      rounded-xl sm:mt-8 sm:rounded-2xl
      transition-all duration-300
    "
  >
    {/* Close Button */}
    <button
      onClick={() => setisOpen(false)}
      className="
        absolute right-3 top-3
        flex h-9 w-9 items-center justify-center
        rounded-lg border border-gray-200
        text-gray-500
        hover:bg-gray-100
        sm:right-5 sm:top-5
        sm:h-10 sm:w-10
      "
    >
      ✕
    </button>

    <div className="p-4 sm:p-6 md:p-8">
      {/* Icon */}
      <div
        className="
          mx-auto flex
          h-16 w-16
          items-center justify-center
          rounded-xl bg-blue-100 p-3
          sm:h-20 sm:w-20 sm:rounded-2xl sm:p-4
        "
      >
        {Icons}
      </div>

      {/* Heading */}
      <h2
        className="
          mt-4 text-center
          text-xl font-bold text-gray-900
          sm:mt-6 sm:text-2xl
        "
      >
        {Title}
      </h2>

      <div className="mx-auto w-full max-w-[400px]">
        <p
          className="
            mx-auto mt-2
            text-center
            text-sm leading-relaxed
            text-gray-500
            sm:text-base
          "
        >
          {describeTitle}
        </p>
      </div>

      {FormsAddTransactions}
    </div>
  </div>
</div>
      </Modal>
  )
}
