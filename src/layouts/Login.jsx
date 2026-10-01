import React, { useEffect, useState } from "react";
import Label from "../component/label";
import Inputs from "../component/Inputs";
import Buttons from "../component/Buttons";
import { LoginAuth } from "../services/Authentications";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Toaster from "../component/Toaster";

export default function Login() {
  const [viewPassword, setviewPassword] = useState(false);
  const [loader, setloader] = useState(false);
  const [alert, setalert] = useState(false);
  const [titleAlert, settitleAlert] = useState("");

  // use - hook - form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formLogin = async (data) => {
    const email = data.email;
    const password = data.password;
    setloader(true);

    try {
      const { response } = await LoginAuth(email, password);
      sessionStorage.setItem("Token", response?.data?.accesToken);
      const getaccessToken = sessionStorage.getItem("Token");
      const getForgetToken = sessionStorage.getItem("tokennewpassword");

      if (getForgetToken) {
        sessionStorage.clear("tokennewpassword");
      }

      if (getaccessToken) {
        setalert(true);
        settitleAlert("Login telah berhasil!!");
        setTimeout(() => {
          window.location.href = "/Dashboard";
        }, 1800);
      }
    } catch (error) {
      setalert(true);
      settitleAlert(error.response?.data?.message);
    } finally {
      setloader(false);
    }
  };
  setTimeout(() => {
    setloader(false);
    setalert(false);
  }, 1500);

  return (
    <>
      <div
        className={`${
          alert === true ? "active" : "hidden"
        } flex justify-center px-4`}
      >
        <Toaster
          className={`
            ${alert === true ? "dropdown" : ""}
            transition-all absolute z-10
            top-0 mt-4
            w-[calc(100%-2rem)]
            sm:w-[80%]
            md:w-[60%]
            lg:w-1/3
            h-14
        `}
          stateNotif={() => setalert(false)}
          ClassTitle={"text-[16px] sm:text-[18px]"}
          Title={titleAlert}
        />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <div
          className="
            w-full
            max-w-[1020px]
            min-h-[650px]
            bg-white
            rounded-2xl
            shadow-lg
            overflow-hidden
            grid
            grid-cols-1
            md:grid-cols-2
        "
        >
          {/* LEFT - FORM */}
          <div
            className="
                w-full
                p-6
                sm:p-8
                lg:p-10
                flex
                flex-col
                justify-center
            "
          >
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Selamat Datang 👋
            </h1>

            <p className="mt-2 text-sm sm:text-base text-gray-400">
              Silahkan Login untuk menggunakan aplikasi
            </p>

            <form onSubmit={handleSubmit(formLogin)} noValidate>
              <div className="mt-6 sm:mt-8 space-y-4">
                {/* EMAIL */}
                <div>
                  <Label
                    Children={"Email Address"}
                    ClassText={"text-left text-gray-600"}
                  />

                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Email tidak boleh kosong!",
                      pattern: {
                        value: /^[^\s@]+\@gmail\.com$/,
                        message: "Email harus pakai @gmail.com",
                      },
                    }}
                    render={({ field }) => (
                      <Inputs
                        Children={"Masukan email@gmail.com"}
                        Class={"mt-2"}
                        type={"email"}
                        ClassParrent={"flex items-center relative w-full"}
                        ClassInput={`
                                        p-3
                                        rounded-xl
                                        bg-slate-100
                                        focus:outline-none
                                        w-full
                                        focus:ring-2
                                        ${
                                          errors.email
                                            ? "focus:ring-red-500 ring-2 ring-red-500 placeholder:text-red-500"
                                            : "focus:ring-blue-500"
                                        }
                                    `}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  {errors.email && (
                    <span className="text-xs sm:text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <Label
                    Children={"Password"}
                    ClassText={"text-left text-gray-600"}
                  />

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
                      },
                    }}
                    render={({ field }) => (
                      <Inputs
                        Children={"Masukan password"}
                        Class={"mt-2"}
                        ClassParrent={"w-full flex items-center relative"}
                        ClassInput={`
                                        w-full
                                        p-3
                                        rounded-xl
                                        bg-slate-100
                                        focus:outline-none
                                        focus:ring-2
                                        ${
                                          errors.password
                                            ? "focus:ring-red-500 ring-2 ring-red-500 placeholder:text-red-500"
                                            : "focus:ring-blue-500"
                                        }
                                    `}
                        type={viewPassword === true ? "text" : "password"}
                        value={field.value}
                        onChange={field.onChange}
                        hiddenPassword={
                          <div
                            className="
                                                absolute
                                                right-2
                                                top-1/2
                                                -translate-y-1/2
                                                cursor-pointer
                                                p-1
                                            "
                            onClick={() => setviewPassword((prev) => !prev)}
                          >
                            {viewPassword === true ? (
                              <PiEyeThin className="text-xl sm:text-2xl" />
                            ) : (
                              <PiEyeSlashThin className="text-xl sm:text-2xl" />
                            )}
                          </div>
                        }
                      />
                    )}
                  />

                  {errors.password && (
                    <span className="text-xs sm:text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* REGISTER + FORGOT PASSWORD */}
                <div
                  className="
                            flex
                            flex-col
                            xs:flex-row
                            sm:flex-row
                            justify-between
                            gap-2
                            text-xs
                            sm:text-sm
                            text-blue-600
                            mt-2
                        "
                >
                  <Link to={"/Register"}>
                    <span className="cursor-pointer hover:underline">
                      Belum punya account?
                    </span>
                  </Link>

                  <Link to={"/Forgot/password"}>
                    <span className="cursor-pointer hover:underline">
                      Lupa password?
                    </span>
                  </Link>
                </div>

                {/* LOGIN BUTTON */}
                <Buttons
                  Classparrent={"mt-6"}
                  Classchild={"w-full"}
                  disabled={loader}
                  Classbutton={`
                            w-full
                            ${
                              loader === true
                                ? "bg-indigo-400 disabled:cursor-not-allowed"
                                : "bg-[#3F47F4] cursor-pointer"
                            }
                            transition
                            text-white
                            py-3
                            rounded-xl
                            text-base
                            sm:text-lg
                            font-semibold
                        `}
                  Title={
                    loader === true ? (
                      <div className="flex justify-center items-center gap-x-2">
                        <svg
                          width={"24px"}
                          fill="white"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                            opacity=".25"
                          />

                          <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              dur="0.75s"
                              values="0 12 12;360 12 12"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>

                        <span className="text-white text-sm sm:text-md">
                          Loading
                        </span>
                      </div>
                    ) : (
                      "Login"
                    )
                  }
                  type={"submit"}
                />
              </div>
            </form>
          </div>

          {/* RIGHT - IMAGE */}
          <div
            className="
                hidden
                md:flex
                flex-col
                justify-between
                bg-[#3F47F4]
                p-6
                relative
            "
          >
            <img src="/Pattern.png" alt="" className="w-24 lg:w-32" />

            <img
              src="/Framelogin.png"
              alt=""
              className="
                    w-full
                    max-w-[400px]
                    lg:max-w-[480px]
                    mx-auto
                    object-contain
                "
            />

            <img
              src="/Pattern-02.png"
              alt=""
              className="
                    w-24
                    lg:w-32
                    self-end
                "
            />
          </div>
        </div>
      </div>
    </>
  );
}
