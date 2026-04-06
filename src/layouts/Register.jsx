import React from 'react'
import Label from '../component/label'
import Inputs from '../component/Inputs'
import Buttons from '../component/Buttons'

export default function Register() {
  return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
              <div className="w-[1020px] h-[750px] bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
                  
                  {/* LEFT - FORM */}
                  <div className="p-10 mt-12">
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
                          ClassParrent={"w-full"}
                          ClassInput={
                          "w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          }
                      />
                      </div>

                       <div>
                      <Label Children={"konfirmasi password"} Class={"text-left"} />
                      <Inputs
                          Children={"konfirmasi password"}
                          Class={"mt-2"}
                          ClassParrent={"w-full"}
                          ClassInput={
                          "w-full p-3 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          }
                      />
                      </div>
      
                      <div className="flex justify-between text-sm text-blue-600 mt-2">
                      <span className="cursor-pointer">Sudah memiliki account?</span>
                      </div>
      
                      <Buttons
                      Classparrent={"mt-6"}
                      Classchild={"w-full"}
                      Classbutton={
                          "w-full bg-[#3F47F4] hover:bg-blue-600 transition text-white py-3 rounded-xl text-lg font-semibold"
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
  )
}
