import React from 'react';


const Kategori = ({getCategory, category}) => {
    return (
        <div className="w-full mb-4 mt-4 flex justify-end">
        <select className="w-48 px-4 py-2 mr-7 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={getCategory} value={category}>
            <option value="">Pilih kategori</option>
            <option value="minuman">🥤 Minuman</option>
            <option value="makanan">🍜 Makanan</option>
        </select>
        </div>
    );
}

export default Kategori;
