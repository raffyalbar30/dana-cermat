import React, { useEffect, useState } from 'react'
import Label from '../component/label'
import Inputs from '../component/Inputs'
import Buttons from '../component/Buttons'
import { LoginAuth } from '../services/api'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'


export default function Login() {
  const [ email, setemail ] = useState("");
  const [ password, setpassword ] = useState("");  
  const [ response, setresponse ] = useState(""); 
  const [ viewPassword, setviewPassword] = useState(false); 

//  React navigations 
  const navigate = useNavigate();

// use - hook - form 
  const { control, handleSubmit, formState:{ errors } } = useForm();


  const formLogin = (data) => {
     console.log(data.email)
  }
  const HandleSumbit = async (e) => {
     try {
     const {data} = await LoginAuth(email, password);
     localStorage.setItem("Token", data.data.AuthToken);
     
     if (data) {
        navigate("/Dashboard");
     }
    setresponse("")
    setemail("")
    setpassword("")
     } catch (error) {
       setresponse("Maaf email atau password salah!!")  
     }
  }

  const HandleViewPassword = () => {
    setviewPassword(prev => !prev);

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-[1020px] h-[750px] bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
            
            {/* LEFT - FORM */}
            <div className="p-10 mt-32">
            <h1 className="text-3xl font-semibold">Selamat Datang 👋</h1>
            <p className="mt-2 text-gray-400">
                Silahkan Login untuk menggunakan aplikasi
            </p>
                <form onSubmit={handleSubmit(formLogin)} noValidate>
                    <div className="mt-8 space-y-4">
                        <div>
                            <Label Children={"Email Address"} ClassText={"text-left text-gray-600"} />
                            <Controller 
                                name="email" 
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Email wajib diisi",
                                    pattern: {
                                        value: /^[^\s@]+@gmail\.com$/,
                                        message: "Email harus pakai domain @gmail.com",
                                    },
                                    }}
                                render={({field}) => (
                                    <Inputs
                                        Children={"Masukan email@gmail.com"}
                                        Class={"mt-2"}
                                        type={"email"}
                                        ClassParrent={"flex items-center relative"}
                                        ClassInput={`p-3 rounded-xl bg-slate-100 focus:outline-none w-full focus:ring-2 ${errors.email ? "focus:ring-red-500 ring-2 ring-red-500" : "focus:ring-blue-500"}`}
                                        value={field.value}
                                        onChange={field.onChange}/>
                                )}
                            />
                        </div>

                        <div>
                        <Label Children={"Password"} ClassText={"text-left text-gray-600"} />
                        <Inputs
                            Children={"Masukan password"}
                            Class={"mt-2"}
                            ClassParrent={"w-full flex items-center relative"}
                            ClassInput={
                            "w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            }
                            type={viewPassword === true ? "text" : "password"}
                            onChange={(e) => {
                                setpassword(e.target.value)
                            }}
                            hiddenPassword={ 
                            <button className='absolute cursor-pointer right-1 mr-2' onClick={() => HandleViewPassword()}>
                                {viewPassword === true ? ( <PiEyeThin className='text-2xl' /> ) 
                                :( <PiEyeSlashThin className='text-2xl' />)}
                            </button>}
                        />
                        </div>

                        {response && ( <span className="text-sm text-red-500">{response}</span>)}
                        <div className="flex justify-between text-sm text-blue-600 mt-2">
                        <Link to={"/Register"}>
                        <span className="cursor-pointer">Belum punya akun?</span>
                        </Link>
                        <span className="cursor-pointer">Lupa password?</span>
                        </div>

                        <Buttons
                        Classparrent={"mt-6"}
                        Classchild={"w-full"}
                        Classbutton={`
                            w-full bg-[#3F47F4] disabled:cursor-not-allowed cursor-pointer transition text-white py-3 rounded-xl text-lg font-semibold`
                        }
                        Title={"Login"} type={"sumbit"}/>
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
