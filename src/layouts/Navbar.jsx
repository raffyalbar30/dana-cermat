import { RxExit } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrTarget } from "react-icons/gr";
import { GrMoney } from "react-icons/gr";
import { GrAnalytics } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Label from "../component/label";
import { IoClose, IoMenu } from "react-icons/io5";



const navbar = [
 {
      Menu: "Dashboard", 
      Links: "/Dashboard", 
      Icons: <LuLayoutDashboard/>
 }, 
 {
      Menu: "Transactions", 
      Links: "/Transactions",
      Icons:  <GrMoney/>
 }, 
 {
      Menu: "Budget", 
      Links: "/Budget", 
      Icons: <GrTarget/>
 }, 
  {
      Menu: "Analytics", 
      Links: "/Analytics", 
      Icons: <GrAnalytics/>
 }, 
 {
      Menu: "Ai Assistent", 
      Links: "/Aiasistent", 
      Icons: <BsRobot/>
 }, 
]


const Navbar = () => {

const [ IsOpen, setIsOpen ] = useState(false); 
const location = useLocation();

    return (
      <div className="relative">

      {/* =====================================
          MOBILE NAVBAR
      ===================================== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">

        <div className="h-16 px-4 flex items-center justify-between">

          {/* LOGO */}
          <div>
            <Label
              Children={"Dana Cermat"}
              ClassText={"text-[22px] font-bold text-[#3F47F4]"}
            />
          </div>

          {/* MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!IsOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition"
          >
            {IsOpen ? (
              <IoClose className="text-[28px] text-slate-700" />
            ) : (
              <IoMenu className="text-[28px] text-slate-700" />
            )}
          </button>

        </div>


        {/* =====================================
            MOBILE DROPDOWN
        ===================================== */}
        {IsOpen && (
          <div className="border-t border-slate-200 bg-white px-3 py-3 shadow-md">

            {/* SUBTITLE */}
            <p className="text-sm text-slate-500 px-2 mb-3">
              Personal Financial Tracker
            </p>


            {/* MENU */}
            <div className="flex flex-col gap-1">

              {navbar.map((items) => {

                const active = location.pathname === items.Links;

                return (
                  <Link
                    key={items.Links}
                    to={items.Links}
                    onClick={() => setIsOpen(false)}
                    className={`
                      ${
                        active
                          ? "bg-blue-700 text-white"
                          : "text-slate-500 hover:bg-slate-100"
                      }
                      rounded-lg
                      py-3
                      px-3
                      flex
                      items-center
                      gap-x-3
                      transition-all
                      duration-200
                    `}
                  >

                    <Label
                      Children={items.Icons}
                      ClassText="text-[22px]"
                    />

                    <Label
                      Children={items.Menu}
                      ClassText="text-[16px]"
                    />

                  </Link>
                );

              })}

            </div>


            {/* LOGOUT */}
            <button
              className="w-full mt-3 pt-3 border-t border-slate-200 flex items-center gap-x-3 px-3 py-3 text-slate-700 hover:bg-slate-100 rounded-lg"
            >

              <RxExit className="text-[24px]" />

              <p className="text-[16px] font-semibold">
                Logout
              </p>

            </button>

          </div>
        )}

      </div>



      {/* =====================================
          DESKTOP SIDEBAR
      ===================================== */}
        <div className="hidden md:flex h-screen w-[300px] bg-white fixed left-0 top-0 flex-col">


            {/* LOGO */}
            <div className="ml-4 pt-6 flex flex-col">

              <Label
                Children={"Dana Cermat"}
                ClassText={"text-[26px] font-bold text-[#3F47F4]"}
              />

              <Label
                Children={"Personal Financial Tracker"}
                ClassText={"text-[18px] text-slate-500"}
              />

            </div>


            {/* NAVIGATION */}
            <div className="mt-6 w-full">

              {navbar.map((items) => {

                const active = location.pathname === items.Links;

                return (
                  <Link
                    key={items.Links}
                    to={items.Links}
                    className={`
                      ${
                        active
                          ? "bg-blue-700 text-white"
                          : "bg-white text-slate-500 hover:bg-slate-200 hover:shadow-md hover:shadow-blue-200/50"
                      }
                      rounded-lg
                      transition-all
                      duration-300
                      ease-in-out
                      mt-1
                      mb-1
                      py-4
                      flex
                      items-center
                      gap-x-2
                      mr-2
                      ml-2
                    `}
                  >

                    <Label
                      Children={items.Icons}
                      ClassText="text-[24px] ml-2"
                    />

                    <Label
                      Children={items.Menu}
                      ClassText="text-[20px]"
                    />

                  </Link>
                );

              })}

            </div>


            {/* LOGOUT */}
            <button
              className="absolute bottom-8 left-8 flex items-center gap-x-2"
            >

              <RxExit className="text-[25px]" />

              <p className="text-[20px] font-semibold">
                Logout
              </p>

            </button>

        </div>

      </div>
    );
}

export default Navbar;

