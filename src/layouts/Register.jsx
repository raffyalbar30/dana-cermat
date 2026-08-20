import React, { useState } from 'react'
import Label from '../component/label'
import Inputs from '../component/Inputs'
import Buttons from '../component/Buttons'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi';
import { RegisterAuth } from '../services/Authentications';
import Toaster from '../component/Toaster';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

export default function Register() {

  const [ alert, setalert ] = useState(false);
  const [ loader, setloader ] = useState(false);
  const [ text, settext ]  = useState("");
  const [ viewPassword, setviewPassword ] = useState(false);
  const [ viewconfirmPassword, setviewconfirmPassword ] = useState(false);
  

  const { control, handleSubmit, formState:{errors} } = useForm();
  
  const formRegister = async (data) => { 
     const Email = data.email; 
     const Password = data.password; 
     const Confirm_Password = data.confirmpassword; 
     setloader(true)
     
     try {
        const { response } = await RegisterAuth(Email, Password, Confirm_Password);
        setalert(true);
        settext(response?.data?.message); 
        
         if (response.status === 201) {
            setTimeout(() => {
                window.location.href = "/Login";
            }, 2000);
          }

     } catch (error) {
        setalert(true);
        settext(error.response?.data?.message); 
     }
  }

    setTimeout(() => {
       setloader(false)
       setalert(false)
    }, 1800);

  return (
    <>
      <div className={`${ alert === true  ? "active" : "hidden"} flex justify-center`}>
           <Toaster className={`${alert === true ? "dropdown" : ""} transition-all absolute z-10 top-0 text-sm mt-4 w-1/3 h-14`}
            stateNotif={() => setalert(false)}  ClassTitle={"text-[18px]"} Title={text}></Toaster>
        </div>
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
              <div className="w-[1020px] h-[750px] bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
                  
                  {/* LEFT - FORM */}
                  <div className="p-10 mt-12">
                  <h1 className="text-3xl font-semibold">Selamat Datang 👋</h1>
                  <p className="mt-2 text-gray-400">
                      Silahkan daftar akun terlebih dahulu
                  </p>
                  <form onSubmit={handleSubmit(formRegister)}>
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
                                   onChange={field.onChange}
                                 />
                            )}
                        />
                           { errors.email && ( 
                                  <span className='text-sm text-red-500'>{errors.email.message}</span>
                            )}
                        </div>
        
                        <div>
                        <Label Children={"Password"} ClassText={"text-left text-gray-600"} />
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
                                  render={({field}) => (
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
                        <Label Children={"Confirm Password"} ClassText={"text-left text-gray-600"} />
                          <Controller
                            name="confirmpassword"
                            control={control}
                            defaultValue=""
                             rules={{
                                    required: "Confirm Password tidak boleh kosong!",
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
                                  render={({field}) => (
                                         <Inputs
                                            Children={"Masukan confirm password"}
                                            Class={"mt-2"}
                                            ClassParrent={"w-full flex items-center relative"}
                                            ClassInput={`w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-500 ring-2 ring-red-500 placeholder:text-red-500" : "focus:ring-blue-500"}`}
                                            type={viewconfirmPassword === true ? "text" : "password"}
                                            value={field.value}
                                            onChange={field.onChange}
                                            hiddenPassword={ 
                                            <div className='absolute cursor-pointer right-1 mr-2' onClick={() => setviewconfirmPassword(prev => !prev)}>
                                                {viewconfirmPassword === true ? ( <PiEyeThin className='text-2xl' /> ) 
                                                      :( <PiEyeSlashThin className='text-2xl' />)}
                                             </div>}
                                          />
                                  )}
                          />
                           { errors.confirmpassword && ( 
                                  <span className='text-sm text-red-500'>{errors.confirmpassword.message}</span>
                            )}
                        </div>
        
                        <div className="flex justify-between text-sm text-blue-600 mt-2 float-right">
                        <Link to={"/Login"}>
                          <span className="cursor-pointer">Sudah memiliki account?</span>
                        </Link> 
                        </div>
        
                         <Buttons
                            Classparrent={"mt-6"}
                            Classchild={"w-full"}
                            Classbutton={`
                            w-full ${loader === true ? "bg-indigo-400" : "bg-[#3F47F4]"} 
                            disabled:cursor-not-allowed cursor-pointer transition text-white py-3 rounded-xl 
                            text-lg font-semibold` }
                            Title={loader === true ? (
                                <div className='flex justify-center items-center gap-x-2'> 
                                   <svg width={"24px"} fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
                                     <span className='text-white text-md'>Loading</span>
                                </div> ) : "Register"} type={"sumbit"}/>
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

    </>
  )
}
