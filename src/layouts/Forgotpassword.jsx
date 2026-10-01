import React, { useEffect, useState } from "react";
import Inputs from "../component/Inputs";
import Buttons from "../component/Buttons";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Toaster from "../component/Toaster";
import { FaPaperPlane } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { SendOTP, VerifyOTP } from "../services/service";
import Label from "../component/label";

const Forgotpassword = () => {
  // react-hook-form
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm();
  const [alert, setalert] = useState(false);
  const [text, settext] = useState("");
  const [loader, setloader] = useState(false);
  const [loaderOTP, setloaderOTP] = useState(false);

  const navigate = useNavigate();

  const formForgot = async (data) => {
    const email = data.email;
    const kodeOTP = data.kodeOTP;
    const encodedEmail = btoa(email);
    if (loader) return;
    setloader(true);

    try {
      const { response } = await VerifyOTP(email, kodeOTP);
      setalert(true);
      settext(response?.data?.message);
      sessionStorage.setItem(
        "tokennewpassword",
        JSON.stringify({
          token: response?.data?.user?.Resetpassword,
          dateEXP: response?.data?.date?.expires_at, // btw ini expires_at, bukan created_at kalau tujuannya buat expiry check
        }),
      );

      if (response.status === 201) {
        const params = createSearchParams({
          email: encodedEmail,
          OTP: kodeOTP,
        });

        setTimeout(() => {
          navigate(`/Forgot/password/createnewpassword?${params}`);
        }, 2000);
      }
    } catch (error) {
      setalert(true);
      settext(error.response?.data?.message);
    }
  };

  const SendingOTP = async () => {
    const emailtrigger = await trigger("email");
    if (!emailtrigger) return;
    if (loader) return;

    const email = getValues("email");
    setloaderOTP(true);

    try {
      const { response } = await SendOTP(email);
      settext(response?.data?.message);
      setalert(true);
    } catch (error) {
      settext(error.response?.data?.message);
      setalert(true);
    }
  };

  setTimeout(() => {
    setalert(false);
    setloader(false);
  }, 1300);

  setTimeout(() => {
    setloaderOTP(false);
  }, 1000);

  //    update
  return (
    <>
      <div
        className={`
        ${alert === true ? "active" : "hidden"}
        flex justify-center
        px-4
    `}
      >
        <Toaster
          className={`
            ${alert === true ? "dropdown" : ""}
            transition-all
            absolute
            z-50
            top-0
            mt-4
            w-[90%]
            sm:w-[70%]
            md:w-[50%]
            lg:w-1/3
            h-14
        `}
          stateNotif={() => setalert(false)}
          ClassTitle={"text-[16px] sm:text-[17px]"}
          Title={text}
        />
      </div>

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        px-4
        py-6
        sm:px-6
        lg:px-8
    "
      >
        <div
          className="
            w-full
            max-w-[1020px]
            min-h-[600px]
            lg:min-h-[650px]
            bg-white
            rounded-2xl
            shadow-lg
            overflow-hidden
            grid
            grid-cols-1
            md:grid-cols-2
        "
        >
          {/* ================= LEFT - FORM ================= */}

          <div
            className="
                w-full
                p-6
                sm:p-8
                lg:p-10
                flex
                items-center
            "
          >
            <div className="w-full max-w-md mx-auto">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Forgot your password ⚠️
              </h1>

              <p className="mt-2 text-sm sm:text-base text-gray-400">
                Silahkan masukan email anda untuk mendapatkan OTP untuk meriset
                password anda!
              </p>

              <form onSubmit={handleSubmit(formForgot)} noValidate>
                <div className="mt-6 sm:mt-8 space-y-4">
                  {/* ================= EMAIL ================= */}

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
                          value: /^[^\s@]+@gmail\.com$/,
                          message: "Email harus pakai @gmail.com",
                        },
                      }}
                      render={({ field }) => (
                        <Inputs
                          Children={"Masukan email@gmail.com"}
                          Class={"mt-2"}
                          type={"email"}
                          ClassParrent="
                                            flex
                                            items-center
                                            relative
                                            w-full
                                        "
                          ClassInput={`
                                            w-full
                                            p-3
                                            rounded-xl
                                            bg-slate-100
                                            focus:outline-none
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

                  {/* ================= OTP ================= */}

                  <div className="mt-2">
                    <Label
                      Children={"Kode-OTP"}
                      ClassText={"text-left text-gray-600"}
                    />

                    <div className="relative z-0 mt-2">
                      <Controller
                        name="kodeOTP"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Kode OTP wajib diisi",

                          maxLength: {
                            value: 6,
                            message: "Kode OTP maximal 6 digit",
                          },

                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Kode OTP harus berupa angka",
                          },
                        }}
                        render={({ field }) => (
                          <Inputs
                            inputMode="numeric"
                            Children={"Number OTP"}
                            type={"text"}
                            ClassParrent="
                                                flex
                                                items-center
                                                w-full
                                            "
                            ClassInput={`
                                                w-full
                                                p-3
                                                pr-14
                                                rounded-xl
                                                bg-slate-100
                                                focus:outline-none
                                                focus:ring-2
                                                ${
                                                  errors.kodeOTP
                                                    ? "focus:ring-red-500 ring-2 ring-red-500 placeholder:text-red-500"
                                                    : "focus:ring-blue-500"
                                                }
                                            `}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />

                      {/* SEND OTP BUTTON */}

                      <button
                        onClick={SendingOTP}
                        type="button"
                        disabled={loaderOTP}
                        className="
                                        absolute
                                        right-1
                                        top-1/2
                                        -translate-y-1/2
                                        disabled:cursor-not-allowed
                                        p-3
                                        rounded-lg
                                        bg-[#3F47F4]
                                        flex
                                        items-center
                                        justify-center
                                    "
                      >
                        {loaderOTP === true ? (
                          <div className="flex justify-center items-center">
                            <svg
                              className="text-white"
                              width="18px"
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
                          </div>
                        ) : (
                          <FaPaperPlane className="text-white text-sm sm:text-base" />
                        )}
                      </button>
                    </div>

                    {errors.kodeOTP && (
                      <span className="mt-1 block text-xs sm:text-sm text-red-500">
                        {errors.kodeOTP.message}
                      </span>
                    )}
                  </div>

                  {/* ================= LINKS ================= */}

                  <div
                    className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:justify-between
                                gap-2
                                text-xs
                                sm:text-sm
                                text-blue-600
                                mt-3
                            "
                  >
                    <Link to={"/Register"}>
                      <span className="cursor-pointer hover:underline">
                        Belum punya account?
                      </span>
                    </Link>

                    <Link to={"/Login"}>
                      <span className="cursor-pointer hover:underline">
                        Sudah punya account?
                      </span>
                    </Link>
                  </div>

                  {/* ================= BUTTON ================= */}

                  <Buttons
                    Classparrent={"mt-5 sm:mt-6"}
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
                            className="text-white"
                            width="24px"
                            fill="white"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                              opacity=".25"
                            />

                            <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0-1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                              <animateTransform
                                attributeName="transform"
                                type="rotate"
                                dur="0.75s"
                                values="0 12 12;360 12 12"
                                repeatCount="indefinite"
                              />
                            </path>
                          </svg>

                          <span className="text-sm sm:text-base">Loading</span>
                        </div>
                      ) : (
                        "Create new password"
                      )
                    }
                    type={"submit"}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* ================= RIGHT - IMAGE ================= */}

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
            <img src="/Pattern.png" alt="" className="w-20 lg:w-32" />

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
                    w-20
                    lg:w-32
                    self-end
                "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
