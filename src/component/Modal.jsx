import React from "react";

const Modal = ({ isOpen, handleClick, setisOpen, children, className}) => {
   return (
      <div className="flex justify-center ">
       <div className={`${isOpen === true ? "active" : "hidden"} fixed insert-0 z-10 rounded-2xl mt-28 w-full
             transition-all duration-300 ease-out bg-black/50 backdrop-blur-md
             ${isOpen === true ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"}`}>
             { children }
        </div>
      </div>
   );
};

export default Modal;