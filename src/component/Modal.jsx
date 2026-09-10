import React from "react";

const Modal = ({ isOpen, children}) => {
   return (
      <div className={`fixed inset-0 pl-64 z-10 flex items-center justify-center bg-black/50 transition-all ${
         isOpen ? "dropdown" : "opacity-0 invisible"}`}>
            <div className={`w-[600px] rounded-2xl bg-white shadow-xl transition-all duration-300 ${
                isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
            {children}
       </div>
       </div>
   );
};

export default Modal;