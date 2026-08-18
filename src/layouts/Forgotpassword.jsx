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

const Forgotpassword = () => {

    // react-hook-form
    const { control, handleSubmit, formState:{errors} } = useForm();

    const formForgot = (data) => {
        const email = data.email; 
        const kodeOTP = data.kodeOTP; 

        console.log(email);
    }

   //    update
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

                           <form onSubmit={handleSubmit(formForgot)}>
                                {/* inputs email */}
                                <div className="mt-8 space-y-4">
                                    <div>
                                        <Label Children={"Email Address"} ClassText={"text-left text-gray-600"} />
                                        <Controller
                                           name="email"
                                           control={control}
                                           defaultValue=""
                                           rules={{
                                                required: "Email tidak boleh kosong!",
                                                pattern: {
                                                    value: /^[^\s@]+@gmail\.com$/,
                                                    message: "Email harus pakai @gmail.com",
                                                },
                                           }}
                                           render={({field}) => (
                                               <Inputs
                                                Children={"Masukan email@gmail.com"}
                                                Class={"mt-2"}
                                                type={"email"}
                                                ClassParrent={"flex items-center relative"}
                                                ClassInput={`p-3 rounded-xl bg-slate-100 focus:outline-none w-full focus:ring-2 ${errors.email ? "focus:ring-red-500 ring-2 ring-red-500 placeholder:text-red-500" : "focus:ring-blue-500"}`}
                                                value={field.value}
                                                onChange={field.onChange}/>
                                           )}
                                        />
                                        { errors.email && ( 
                                          <span className='text-sm text-red-500'>{errors.email.message}</span>
                                        )}
                                    </div>

                                    <div className='mt-2'>
                                    <Label Children={"Kode-OTP"} ClassText={"text-left text-gray-600"} />
                                    <div className="relative z-0 mt-2">
                                    <Controller
                                        name="kodeOTP"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                                required: "OTP wajib diisi",
                                                maxLength: {
                                                value: 6,
                                                message: "OTP maximal 6 digit",
                                                },
                                                pattern: {
                                                value: /^[0-9]+$/,
                                                message: "OTP harus berupa angka",
                                                },
                                            }}
                                        render={({field}) => (
                                            <Inputs
                                                inputMode="numeric"
                                                Children={"Number OTP"}
                                                type={"text"}
                                                ClassParrent={"flex items-center"}
                                                ClassInput={`w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 ${errors.kodeOTP ? "focus:ring-red-500 ring-2 ring-red-500 placeholder:text-red-500" : "focus:ring-blue-500"}`}
                                                value={field.value}
                                                onChange={field.onChange}/>
                                               
                                        )}
                                       />
                                            <button
                                               type="button"
                                                 className="absolute right-1 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-[#3F47F4]">
                                                   <FaPaperPlane className="text-white" />
                                              </button>
                                    </div>

                                        {errors.kodeOTP && (
                                             <span className="mt-1 block text-sm text-red-500">
                                                        {errors.kodeOTP.message}
                                            </span>
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
                                        Title={"Create new password"} type={"sumbit"}/>

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
    );
}

export default Forgotpassword;
