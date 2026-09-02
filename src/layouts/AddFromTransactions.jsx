import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Label from '../component/Label';
import { AddTransactions, EndpointApi, Getcategory } from '../services/api';


const AddFormTransactions = ({setIsOpen}) => {
    const [ category, setcategory ] = useState([]); 
    const { control, handleSubmit, formState:{errors} } = useForm();
    const token = sessionStorage.getItem("Token"); 

    const Getcategory = async (type_categories) => { 
    try {
        const response = await EndpointApi.get(`/Transaksi/v1/getCategories`, {
            params: { type_categories }
        });
        console.log(response.data);
        return { response: response.data };
    } catch (error) {
        console.error(error);
    }
  }

    const handleAddtransactions = async (data) => {
        const TypeBudget = data.TypeBudget; 

        if (TypeBudget){
           return await Getcategory('Expanses');   
        }

       try {
          const { response } = await AddTransactions(token);
       } catch (error) {
         console.log(error); 
       }
    }
    
    console.log(category); 

    return (
        <div>
             <form onSubmit={handleSubmit(handleAddtransactions)}>
                 <div className="mt-8 space-y-4">
                      <div className="w-full mt-4">
                          <Label Children={"Type Budget"} ClassText={"text-left text-gray-600"}/>
                             <div className="relative w-full mt-1">
                                <Controller
                                   name="TypeBudget"
                                            control={control}
                                            rules={{ required: 'Kategori wajib dipilih' }}
                                            render={({ field }) => (
                                                <select
                                                        className={`border focus:outline-none focus:ring-2 ${
                                                        errors.TypeBudget
                                                            ? "focus:ring-red-500 ring-2 ring-red-500 border-red-500 placeholder:text-red-500"
                                                            : "focus:ring-blue-500 border-blue-500"
                                                        } w-full flex justify-between items-center text-left p-2 border rounded-md bg-gray-50`}
                                                        {...field}
                                                >
                                                <option value="">Pilih kategori</option>
                                                <option value="Expanses">Expanses</option>
                                                <option value="Income">Income</option>
                                                </select>
                                            )}
                                            />
                                        {errors.TypeBudget && <p className="text-red-500 text-sm">{errors.TypeBudget.message}</p>}
                                    </div>
                                </div>
            
                                <div className="w-full mt-2">
                                    <Label Children={"Type Category"} ClassText={"text-left text-gray-600"}/>
                                        <div className="relative w-full mt-1">
                                        <Controller
                                            name="TypeCategory"
                                            control={control}
                                            rules={{ required: 'Kategori wajib dipilih' }}
                                            render={({ field }) => (
                                                <select
                                                        className={`border focus:outline-none focus:ring-2 ${
                                                        errors.TypeCategory
                                                            ? "focus:ring-red-500 ring-2 ring-red-500 border-red-500 placeholder:text-red-500"
                                                            : "focus:ring-blue-500 border-blue-500"
                                                        } w-full flex justify-between items-center text-left p-2 border rounded-md bg-gray-50`}
                                                        {...field}
                                                >
                                                <option value="">Pilih kategori</option>
                                                <option value="Expanses">Expanses</option>
                                                <option value="Income">Income</option>
                                                </select>
                                            )}
                                            />
                                        {errors.TypeCategory && <p className="text-red-500 text-sm">{errors.TypeCategory.message}</p>}
                                        </div>
                                </div>
            
                               <div className="w-full mt-2">
                                    <Label Children={"Amount"} ClassText={"text-left text-gray-600"}/>
                                        <div className="relative w-full mt-1">
                                            <Controller
                                            name="Amount"
                                            control={control}
                                            rules={{
                                                required: 'Jumlah wajib diisi',
                                                pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'Jumlah harus berupa angka',
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
                                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                                    field.onChange(value);
                                                }}
                                                />
                                            )}
                                            />
                                            {errors.Amount && <p className="text-red-500 text-sm">{errors.Amount.message}</p>}
                                        </div>
                                </div>
            
                                <div className="w-full mt-2">
                                    <Label Children={"Date"} ClassText={"text-left text-gray-600"}/>
                                        <div className="relative w-full mt-1">
                                            <Controller
                                                name="Date"
                                                control={control}
                                                rules={{ required: 'Tanggal wajib diisi' }}
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
                                                {errors.Date && <p className="text-red-500 text-sm">{errors.Date.message}</p>}
                                        </div>
                                </div>
            
                               <div className="w-full mt-2">
                                    <Label Children={"Descriptions"} ClassText={"text-left text-gray-600"}/>
                                        <div className="relative w-full mt-1">
                                            <Controller
                                                name="Description"
                                                control={control}
                                                rules={{
                                                    required: 'Deskripsi wajib diisi',
                                                    maxLength: {
                                                    value: 200,
                                                    message: 'Deskripsi maksimal 200 karakter',
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <textarea
                                                    placeholder="Masukan deskripsi transaksi"
                                                    rows={3}
                                                    className={`focus:outline-none focus:ring-2 resize-none ${
                                                        errors.Description
                                                        ? "focus:ring-red-500 ring-2 ring-red-500 border-red-500 placeholder:text-red-500"
                                                        : "focus:ring-blue-500 border-blue-500"
                                                    } w-full p-2 border rounded-md bg-gray-50`}
                                                    {...field}
                                                    />
                                                )}
                                                />
                                            {errors.Description && <p className="text-red-500 text-sm">{errors.Description.message}</p>}
                                        </div>
                                </div>
                                       {/* Actions */}
                               <div className="mt-8 flex flex-col gap-3">
                                        <button
                                        type="submit"
                                        className="rounded-xl bg-[#3F47F4] py-3 cursor-pointer font-medium text-white transition"
                                        >
                                        Update transactions
                                        </button>
            
                                        <button
                                        onClick={()=> setIsOpen(false)}
                                        type="button"
                                        className="rounded-xl border cursor-pointer border-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                        Cancel
                                        </button>
                               </div>
                 </div>
              </form>
        </div>
    );
}

export default AddFormTransactions;
