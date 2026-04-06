import { RxExit } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrTarget } from "react-icons/gr";
import { GrMoney } from "react-icons/gr";
import { GrAnalytics } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";
import Label from '../component/label';
import { Link } from "react-router-dom";
import { useState } from "react";



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

const [ active, setactive ] = useState("Dashboard"); 

    return (
        <div className='h-full w-[300px] fixed border border-l-0 border-t-0 border-b-0 bg-white border-slate-200 flex-wrap ml-4 mr-4'>
            <div className='ml-2 pt-4 flex flex-col '> 
                <Label Children={"Dana Cermat"} ClassText={`text-[26px] font-bold text-[#3F47F4]`}/>
                  <Label Children={"Personal Financial Tracker"} ClassText={`text-[18px] text-slate-500`}/>
            </div>
            <div className="mt-6 w-full cursor-pointer">
                  {
                    navbar.map((items) => {
                       return (
                              <Link to={items.Links} onClick={() => setactive(items.Menu)} className={`${items.Menu === active ? `bg-blue-700 rounded-lg text-white ` : `bg-white rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-200
                                   hover:shadow-md hover:shadow-blue-200/50`} text-slate-500 mt-1 mb-1 py-4 flex items-center gap-x-2 mr-2 ml-2`}>
                                  <Label Children={items.Icons}  ClassText={`text-[24px] ml-2`}/>
                                  <Label Children={items.Menu} ClassText={`text-[20px]`} />
                              </Link>
                              )
                        })
                  }
            </div>
            
            <div className='ml-8 cursor-pointer absolute bottom-1 flex items-center gap-x-2 mb-8'>
                  <RxExit className='text-[25px]'></RxExit>
                  <p className='text-[20px] font-semibold'>Logout</p>
            </div>
        </div>
    );
}

export default Navbar;

