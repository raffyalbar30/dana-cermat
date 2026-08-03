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

const Forgotpassword = () => {
    return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="w-[1020px] h-[750px] bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
                        
                        {/* LEFT - FORM */}
                        <div className="p-10 mt-32">
                        <h1 className="text-3xl font-semibold">Forgot your password ⚠️</h1>
                        <p className="mt-2 text-gray-400">
                            Silahkan masukan email anda untuk mendapatkan OTP untuk meriset 
                            password anda!
                        </p>
                            {/* inputs password */}
                            <div className="mt-8 space-y-4">
                                 <div>
                                    <Label Children={"Email Address"} ClassText={"text-left text-gray-600"} />
                                    <Inputs
                                     Children={"Masukan email@gmail.com"}
                                     Class={"mt-2"}
                                     type={"email"}
                                     ClassParrent={"flex items-center relative"}
                                     ClassInput={`p-3 rounded-xl bg-slate-100 focus:outline-none w-full focus:ring-2 ring-2 ring-blue-500 focus:ring-blue-500`}
                                    />
                                 </div>

                                <div>
                                <Label Children={"Kode-OTP"} ClassText={"text-left text-gray-600"} />

                                <div className="relative mt-2">
                                 <Inputs
                                    inputMode="numeric"
                                    Children={"Number OTP"}
                                    type={"text"}
                                    ClassParrent={"flex items-center"}
                                    ClassInput={
                                        "p-3 pr-14 rounded-xl bg-slate-100 w-full focus:outline-none ring-2 ring-blue-500 focus:ring-2 focus:ring-blue-500"
                                    }
                                    />

                                    <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-500 transition"
                                    >
                                    <FaPaperPlane size={18} />
                                    </button>
                                </div>
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
                                    Title={"Forgot password now"} type={"sumbit"}/>

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
    );
}

export default Forgotpassword;
