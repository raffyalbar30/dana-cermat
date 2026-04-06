import React from 'react';
import { Children } from 'react';

const Table = ( { Children}) => {
    return (
        <div class="overflow-x-auto h-[480px] bg-white shadow-md rounded-lg mr-6">
        <table class="min-w-full h-full border border-gray-200">
        
            <thead class="bg-[#3F47F4] text-white">
            <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold">No</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Nama Pengeluaran</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Harga</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Tanggal</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                { Children }
            </tbody>
        </table>
        </div>
    );
}

export default Table;


export const TableContent = ({ data }) => {
  
    
  return (
      <>
         {
                 data.length > 1 ? (
                 data?.map((items) => {
                       return (
                        
                        <tr class="hover:bg-gray-50 transition">
                        <td class="px-2 py-4 text-sm text-gray-700 border border-slate-200 text-center">
                            {items.id}</td>
                            <td class="px-6 py-4 text-sm text-gray-700 border border-slate-200">
                                <div className="flex gap-x-2 items-center">
                                <img className="w-[50px] h-[50px] rounded-full" src={items.Image}/>
                                    {`${items?.FirstName} ${items?.LastName}`}
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700 border border-slate-200">
                                    {items.Harga}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700 border border-slate-200">
                                    {items.Tgl}
                            </td>
                            </tr>
                       )
                   })
                 ) : (
                  data?.slice(0, 7).map((items) => {
                       return (
                        
                        <tr class="hover:bg-gray-50 transition">
                        <td class="px-2 py-4 text-sm text-gray-700 border border-slate-200 text-center">
                            {items.id}</td>
                            <td class="px-6 py-4 text-sm text-gray-700 border border-slate-200">
                                <div className="flex gap-x-2 items-center">
                                <img className="w-[50px] h-[50px] rounded-full" src={items.Image}/>
                                    {`${items?.FirstName} ${items?.LastName}`}
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700 border border-slate-200">
                                    {items.Harga}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-700 border border-slate-200">
                                    {items.Tgl}
                            </td>
                            </tr>
                       )
                   })
                 ) 
       }
      </>
  )
    
}
 