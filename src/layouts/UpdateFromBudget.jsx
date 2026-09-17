import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Label from "../component/Label";
import Buttons from "../component/Buttons";

const UpdateFromAddBudget = ({ 
  category, 
  loader, 
  setloader,
  setisOpen, 
  getIdBudgets,
  getIdCategory,
  getperiod, 
  getamount, 
  getstartdate, 
  setgetconfirmupdate, 
  setpopupconfirmupdate}) => {

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
     defaultValues: {
      Amount: "",
      Date: ""
    },
  });
  
  const dataPriode = [
    {
        id: 1, 
        priode: "threeday"
    }, 
    {
        id: 2, 
        priode: "weekly"
    }, 
    {
        id: 3, 
        priode: "monthly"
    }, 
    {
        id: 4, 
        priode: "yearly"
    }
  ]; 


  const HandleAddBudgets = async (data) => {
     const Typecategory = watch("TypeCategory");
     const Priode = data.priode;
     const Amount = data.Amount; 
     const date = data.Date; 

     const typecategorname = category.find(
      (item) => String(item?.categories_id) === String(Typecategory)
     )?.name_categories ?? "-"; 

    const startDate = new Date(date);
    let endDate = new Date(startDate);

    switch (getperiod) {
      case "threeday":
        endDate.setDate(endDate.getDate() + 3);
        break;

      case "weekly":
        endDate.setDate(endDate.getDate() + 7);
        break;

      case "monthly":
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          0,
        );
        break;

      case "yearly":
        endDate = new Date(startDate.getFullYear(), 11, 31);
        break;

      default:
        console.error("Periode tidak valid");
        return;
    }

     const dataBudget = {
        idbudget: getIdBudgets, 
        idcategory: Typecategory,
        Typecategory: typecategorname, 
        priode: Priode, 
        amount: Amount,
        startdate: date,
        enddate: endDate
     }

     setloader(true)
     setgetconfirmupdate(dataBudget);
     setTimeout(() => {
      setisOpen(false);
    }, 1800); 
    setpopupconfirmupdate(true);
  }

  useEffect(() => {
      reset({
        Amount: getamount || "",
        Date: getstartdate ? new Date(getstartdate).toLocaleDateString("en-CA", 
          {
            timeZone: "Asia/Jakarta",
          }) : "" || ""
      });
    }, [getamount, getstartdate, reset]);

  setTimeout(() => {
    setloader(false)
  }, 1300);

  return (
    <div>
      <form onSubmit={handleSubmit(HandleAddBudgets)}>
        <div className="mt-8 space-y-4">
          <div className="w-full mt-2">
            <Label
              Children={"Type Category"}
              ClassText={"text-left text-gray-600"}
            />
            <div className="relative w-full mt-1">
              <Controller
                name="TypeCategory"
                control={control}
                rules={{ required: "Kategori wajib dipilih" }}
                render={({ field }) => (
                  <select
                    className={`border focus:outline-none focus:ring-2 ${
                      errors.TypeCategory
                        ? "focus:ring-red-500 ring-2 ring-red-500 border-red-500 placeholder:text-red-500"
                        : "focus:ring-blue-500 border-blue-500"
                    } w-full flex justify-between items-center text-left p-2 border rounded-md bg-gray-50`}
                    {...field}
                  >
                    {category?.slice()
                      .sort((a, b) =>
                      a?.categories_id === getIdCategory ? -1 : b?.categories_id === getIdCategory ? 1 : 0)
                      .map((data) => {
                      return (
                        <>
                          <option
                            key={data?.categories_id}
                            value={data?.categories_id}
                          >
                            {data?.name_categories}
                          </option>
                        </>
                      );
                    })}
                  </select>
                )}
              />
              {errors.TypeCategory && (
                <p className="text-red-500 text-sm">
                  {errors.TypeCategory.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full mt-2">
            <Label
              Children={"Type Priode"}
              ClassText={"text-left text-gray-600"}
            />
            <div className="relative w-full mt-1">
              <Controller
                name="priode"
                control={control}
                rules={{ required: "Priode wajib dipilih" }}
                render={({ field }) => (
                  <select
                    className={`border focus:outline-none focus:ring-2 ${
                      errors.TypeCategory
                        ? "focus:ring-red-500 ring-2 ring-red-500 border-red-500 placeholder:text-red-500"
                        : "focus:ring-blue-500 border-blue-500"
                    } w-full flex justify-between items-center text-left p-2 border rounded-md bg-gray-50`}
                    {...field}
                  >
                      {dataPriode
                        ?.slice()
                        .sort((a, b) =>
                          a?.priode === getperiod ? -1 : b?.priode === getperiod ? 1 : 0
                        )
                        .map((data) => (
                          <option key={data?.priode} value={data?.priode}>
                            {data?.priode}
                          </option>
                        ))}
                  </select>
                )}
              />
              {errors.TypeCategory && (
                <p className="text-red-500 text-sm">
                  {errors.TypeCategory.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full mt-2">
            <Label Children={"Amount"} ClassText={"text-left text-gray-600"} />
            <div className="relative w-full mt-1">
              <Controller
                name="Amount"
                control={control}
                rules={{
                  required: "Jumlah wajib diisi",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Jumlah harus berupa angka",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Masukan jumlah transaksi"
                    className={`focus:outline-none focus:ring-2 ${
                      errors.Amount
                        ? "focus:ring-red-500 ring-2 ring-red-500 border-red-500 placeholder:text-red-500"
                        : "focus:ring-blue-500 border-blue-500"
                    } w-full p-2 border rounded-md bg-gray-50`}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(value);
                    }}
                  />
                )}
              />
              {errors.Amount && (
                <p className="text-red-500 text-sm">{errors.Amount.message}</p>
              )}
            </div>
          </div>
          <div className="w-full mt-2">
            <Label Children={"Date"} ClassText={"text-left text-gray-600"} />
            <div className="relative w-full mt-1">
              <Controller
                name="Date"
                control={control}
                rules={{ required: "Tanggal wajib diisi" }}
                render={({ field }) => (
                  <input
                    type="date"
                    className={`focus:outline-none focus:ring-2 ${
                      errors.Date
                        ? "focus:ring-red-500 ring-2 ring-red-500 border-red-500"
                        : "focus:ring-blue-500 border-blue-500"
                    } w-full p-2 border rounded-md bg-gray-50`}
                    {...field}
                  />
                )}
              />
              {errors.Date && (
                <p className="text-red-500 text-sm">{errors.Date.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3">
            <Buttons
              Classparrent={"mt-4"}
              Classchild={"w-full"}
              disabled={loader}
              Classbutton={`
              w-full ${loader === true ? "bg-indigo-400 disabled:cursor-not-allowed" : "bg-[#3F47F4] cursor-pointer "} transition text-white py-3 rounded-xl text-lg font-semibold`}
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
                    <span className="text-white text-md">Loading</span>
                  </div>
                ) : (
                  "Rename budgeting"
                )
              }
            />

            <button
              onClick={() => setisOpen(false)}
              type="button"
              className="rounded-xl border cursor-pointer border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel Rename budgeting
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateFromAddBudget;
