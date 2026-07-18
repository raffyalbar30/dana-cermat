import React, { useState } from 'react'
import Label from '../component/label'
import Inputs from '../component/Inputs'
import Buttons from '../component/Buttons'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi';
import { RegisterAuth } from '../services/api';
import Toaster from '../component/Toaster';
import { Link } from 'react-router-dom';

export default function Register() {

  const [ email, setemail ]  = useState();
  const [ password, setpassword ] = useState(); 
  const [ confirmpassword, setconfirmpassword ] = useState();  
  const [ alert, setalert ] = useState(false);
  const [ text, settext ]  = useState("");
  const [ viewPassword, setviewPassword ] = useState(false);
  const [ viewconfirmPassword, setviewconfirmPassword ] = useState(false);

  const HandleViewPassword = () => {
    setviewPassword(prev => !prev);

  }
  
  const HandleViewConfirmPassword = () => {
    setviewconfirmPassword(prev => !prev);

  }

  const userRegist = async () => {
    if(password === confirmpassword) {
        const { response } = await RegisterAuth(email, password);
        setalert(true);
        settext(response?.message); 
       setTimeout(() => {
         setalert(false);
       }, 3000)

    } else { 
      
        setalert(true);
        settext("Password harus sesuai dengan confirm password"); 

        setTimeout(() => {
         setalert(false);
       }, 3000)
    }
    
  }


  return (
    <>
      <div className={`${ alert === true  ? "active" : "hidden"} flex justify-center`}>
           <Toaster className={`${alert === true ? "dropdown" : ""} transition-all absolute z-10 top-0 text-sm mt-4 w-1/3 h-14`}
            stateNotif={() => setalert(false)} Title={text}></Toaster>
        </div>
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
              <div className="w-[1020px] h-[750px] bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
                  
                  {/* LEFT - FORM */}
                  <div className="p-10 mt-12">
                  <h1 className="text-3xl font-semibold">Selamat Datang</h1>
                  <p className="mt-2 text-gray-600">
                      Silahkan daftar akun terlebih dahulu
                  </p>
      
                  <div className="mt-8 space-y-4">
                      <div>
                      <Label Children={"Email Address"} Class={"text-left"} />
                      <Inputs
                          onChange={(e) => setemail(e.target.value)}
                          Children={"Masukan email@gmail.com"}
                          Class={"mt-2"}
                          ClassParrent={"w-full"}
                          ClassInput={
                          "w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          }
                      />
                      </div>
      
                      <div>
                      <Label Children={"Password"} Class={"text-left"} />
                           <Inputs
                              Children={"Masukan password"}
                              Class={"mt-2"}
                              ClassParrent={"w-full flex items-center relative"}
                              ClassInput={"w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                              type={viewPassword === true ? "text" : "password"}
                                 onChange={(e) => { setpassword(e.target.value)}}
                                 hiddenPassword={ 
                                          <button className='absolute cursor-pointer right-1 mr-2' onClick={() => HandleViewPassword()}>
                                                  {viewPassword === true ? ( <PiEyeThin className='text-2xl' /> ) 
                                                     :( <PiEyeSlashThin className='text-2xl' />)}
                               </button>}
                         />
                      </div>

                       <div>
                      <Label Children={"Confirm Password"} Class={"text-left"} />
                         <Inputs
                              Children={"Konfirmasi password"}
                              Class={"mt-2"}
                              ClassParrent={"w-full flex items-center relative"}
                              ClassInput={"w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                              type={viewconfirmPassword === true ? "text" : "password"}
                                 onChange={(e) => { setconfirmpassword(e.target.value)}}
                                 hiddenPassword={ 
                                          <button className='absolute cursor-pointer right-1 mr-2' onClick={() => HandleViewConfirmPassword()}>
                                                  {viewconfirmPassword === true ? ( <PiEyeThin className='text-2xl' /> ) 
                                                     :( <PiEyeSlashThin className='text-2xl' />)}
                                              </button>}
                                />
                      </div>
      
                      <div className="flex justify-between text-sm text-blue-600 mt-2">
                      <Link to={"/Login"}>
                        <span className="cursor-pointer">Sudah memiliki account?</span>
                      </Link> 
                      </div>
      
                      <Buttons
                      onClick={() => userRegist()}
                      Classparrent={"mt-6"}
                      Classchild={"w-full"}
                      Classbutton={
                          "w-full bg-[#3F47F4] cursor-pointer hover:bg-blue-600 transition text-white py-3 rounded-xl text-lg font-semibold"
                      }
                      Title={"Register"}
                      />
                  </div>
                  </div>
      
                  {/* RIGHT - IMAGE */}
                  <div className="hidden md:flex flex-col justify-between bg-[#3F47F4] p-6 relative">
                  <img src="/Pattern.png" alt="" className="w-32" />
      
                  <img
                      src="/Framelogin.png"
                      alt=""
                      className="w-2xl mx-auto"
                  />
      
                  <img src="/Pattern-02.png" alt="" className="w-32 self-end" />
                  </div>
      
              </div>
          </div>

    </>
  )
}
