import React, { useEffect, useState } from 'react'
import Label from '../component/label'
import Inputs from '../component/Inputs'
import Buttons from '../component/Buttons'
import { LoginAuth } from '../services/api'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'





export default function Login() {
  const [ email, setemail ] = useState("");
  const [ password, setpassword ] = useState("");  
  const [ response, setresponse ] = useState(""); 
  const [ viewPassword, setviewPassword] = useState(false); 
  const navigate = useNavigate();



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
            <h1 className="text-3xl font-semibold">Selamat Datang</h1>
            <p className="mt-2 text-gray-600">
                Silahkan login untuk menggunakan aplikasi
            </p>

            <div className="mt-8 space-y-4">
                <div>
                <Label Children={"Email Address"} Class={"text-left"} />
                <Inputs
                    Children={"Masukan email@gmail.com"}
                    Class={"mt-2"}
                    ClassParrent={"flex items-center relative"}
                    ClassInput={
                    "p-3 rounded-xl bg-slate-100 focus:outline-none w-full focus:ring-2 focus:ring-blue-500"}
                    pattern={"^[a-zA-Z0-9._%+-]+@gmail\.com$"}
                   onChange={(e) =>  {
                      setemail(e.target.value)
                   }}
                />
                </div>

                <div>
                <Label Children={"Password"} Class={"text-left"} />
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
                <span className="cursor-pointer">Belum punya akun?</span>
                <span className="cursor-pointer">Lupa password?</span>
                </div>

                <Buttons
                Classparrent={"mt-6"}
                Classchild={"w-full"}
                Classbutton={
                    "w-full bg-[#3F47F4] hover:bg-blue-600 transition text-white py-3 rounded-xl text-lg font-semibold"
                }
                disabled={!email || !password}
                Title={"Login"}
                onClick={(e) => HandleSumbit(e)}/>
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
  )
}
