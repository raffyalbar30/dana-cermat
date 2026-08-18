import React, { useEffect, useState } from 'react'
import Label from '../component/label'
import Inputs from '../component/Inputs'
import Buttons from '../component/Buttons'
import { LoginAuth } from '../services/Authentications'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import Toaster from '../component/Toaster'
import { FaPaperPlane } from 'react-icons/fa'
import { IoSend } from "react-icons/io5";

export default function NewPassword() {

    const [ viewPassword, setviewPassword ] = useState(false); 
    const [ confirmnewpassword, setconfirmnewpassword ] = useState(false);

     // react-hook-form
       const { control, handleSubmit, formState:{errors} } = useForm();
   
       const formForgot = (data) => {
           const email = data.email; 
           const kodeOTP = data.kodeOTP; 
   
           console.log(email);
       }
   
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                         <div className="w-[1020px] h-[750px] bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
                             
                             {/* LEFT - FORM */}
                             <div className="p-10 mt-32">
                             <h1 className="text-3xl font-semibold">Update your password ⚠️</h1>
                             <p className="mt-2 text-gray-400">
                                 Silahkan untuk membuat password baru, pastikan cuman kamu yang tau 
                                 apa passwordmu!!
                             </p>
     
                                <form onSubmit={handleSubmit(formForgot)}>
                                     {/* inputs password */}
                                     <div className="mt-8 space-y-4">
                                         <div>
                                             <Label Children={"New password"} ClassText={"text-left text-gray-600"} />
                                               <Controller
                                                  name="password"
                                                  control={control}
                                                  defaultValue=""
                                                  rules={{
                                                     required: "Password tidak boleh kosong!",
                                                     minLength: {
                                                     value: 4,
                                                     message: "Password minimal 4 character",
                                                     },
                                                     maxLength: {
                                                        value: 18,
                                                         message: "Password maksimal 18 character",
                                                      },
                                                       pattern: {
                                                             value: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).+$/,
                                                             message: "Password harus mengandung angka dan simbol",
                                                          }
                                                         }}
                                                          render={({ field }) => (
                                                              <Inputs
                                                               Children={"Masukan password"}
                                                                                          Class={"mt-2"}
                                                                                          ClassParrent={"w-full flex items-center relative"}
                                                                                          ClassInput={`w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-500 ring-2 ring-red-500 placeholder:text-red-500" : "focus:ring-blue-500"}`}
                                                                                          type={viewPassword === true ? "text" : "password"}
                                                                                          value={field.value}
                                                                                          onChange={field.onChange}
                                                                                          hiddenPassword={ 
                                                                                          <div className='absolute cursor-pointer right-1 mr-2' onClick={() => setviewPassword(prev => !prev)}>
                                                                                              {viewPassword === true ? ( <PiEyeThin className='text-2xl' /> ) 
                                                                                              :( <PiEyeSlashThin className='text-2xl' />)}
                                                               </div>}
                                                              />
                                                        )}
                                                                          />
                                             { errors.password && ( 
                                               <span className='text-sm text-red-500'>{errors.password.message}</span>
                                             )}
                                         </div>
    
     
                                          <div>
                                             <Label Children={"Confirm new password"} ClassText={"text-left text-gray-600"} />
                                               <Controller
                                                  name="confirm password"
                                                  control={control}
                                                  defaultValue=""
                                                  rules={{
                                                     required: "Password tidak boleh kosong!",
                                                     minLength: {
                                                     value: 4,
                                                     message: "Password minimal 4 character",
                                                     },
                                                     maxLength: {
                                                        value: 18,
                                                         message: "Password maksimal 18 character",
                                                      },
                                                       pattern: {
                                                             value: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).+$/,
                                                             message: "Password harus mengandung angka dan simbol",
                                                          }
                                                         }}
                                                          render={({ field }) => (
                                                              <Inputs
                                                               Children={"Masukan confirm password"}
                                                                                          Class={"mt-2"}
                                                                                          ClassParrent={"w-full flex items-center relative"}
                                                                                          ClassInput={`w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-500 ring-2 ring-red-500 placeholder:text-red-500" : "focus:ring-blue-500"}`}
                                                                                          type={confirmnewpassword === true ? "text" : "password"}
                                                                                          value={field.value}
                                                                                          onChange={field.onChange}
                                                                                          hiddenPassword={ 
                                                                                          <div className='absolute cursor-pointer right-1 mr-2' onClick={() => setconfirmnewpassword(prev => !prev)}>
                                                                                              {confirmnewpassword === true ? ( <PiEyeThin className='text-2xl' /> ) 
                                                                                              :( <PiEyeSlashThin className='text-2xl' />)}
                                                               </div>}
                                                              />
                                                        )}
                                                                          />
                                             { errors.password && ( 
                                               <span className='text-sm text-red-500'>{errors.password.message}</span>
                                             )}
                                         </div>
                                         {/* forgot password */}
                                         <div className="flex justify-between text-sm text-blue-600 mt-2">
                                         
                                             <Link to={"/Register"}>
                                             <span className="cursor-pointer">Belum punya account?</span>
                                             </Link>
                                         
                                             <Link to={"/Login"}>
                                                 <span className="cursor-pointer">Sudah punya account?</span>
                                             </Link>
                                         
                                         </div>
     
                                         <Buttons
                                         Classparrent={"mt-6"}
                                         Classchild={"w-full"}
                                         Classbutton={`
                                                 w-full bg-blue-700 disabled:cursor-not-allowed cursor-pointer transition text-white py-3 rounded-xl text-lg font-semibold`
                                             }
                                             Title={"Update password"} type={"sumbit"}/>
     
                                     </div>

                                </form>
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
  )
}
