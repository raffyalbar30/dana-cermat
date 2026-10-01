import React from "react";

const ToasterModalUpdateBudget = ({ Confirm, Chilldren }) => {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center
    px-4 md:pl-64
    bg-black/50 transition-all
    ${Confirm ? "opacity-100" : "opacity-0 invisible"}`}
    >
      <div
        className={`w-full max-w-xl max-h-[90vh] overflow-y-auto
      rounded-xl sm:rounded-2xl
      bg-white shadow-xl
      transition-all duration-300
      ${Confirm ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        {Chilldren}
      </div>
    </div>
  );
};

export default ToasterModalUpdateBudget;
