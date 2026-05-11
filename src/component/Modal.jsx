import React from "react";

const Modal = ({ isOpen, handleClick, setisOpen, children }) => {
   return (
      <div className={`${isOpen === true ? "active" : "hidden"} 
         w-full bg-transparent flex justify-center items-center `}> 
       <div className={`fixed z-10 bg-white rounded-2xl mt-80 w-1/2 shadow-lg h-auto
             transition-all duration-300 ease-out
             ${isOpen === true ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
             { children }
        </div>
      </div>
   );
};

export default Modal;