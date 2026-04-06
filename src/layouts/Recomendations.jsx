import React from 'react';
import { LuBrain } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Recomendations = () => {
    return (
                <div className="rounded-2xl  w-[500px] bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white shadow-lg  shadow-gray-400">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <LuBrain  className="w-5 h-5" />
                      <h3 className="font-semibold text-lg">AI Recommendations</h3>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-full bg-white/20 p-2 hover:bg-white/30">
                        <FaChevronLeft  size={16} />
                      </button>
                      <button className="rounded-full bg-white/20 p-2 hover:bg-white/30">
                        <FaChevronRight size={16} />
                      </button>
                    </div>
                  </div>
        
                  {/* Card */}
                  <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
                    <h4 className="font-semibold mb-1">Tips Finance: 70 / 30 Rules</h4>
                    <p className="text-sm text-white/90 mb-4">
                      Mulai kelola keuangan kamu dengan 70 pemasukan dan 30 pengeluaran, 
                      jangan lupa berinvestasi.
                    </p>
        
                    <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition">
                        Baca sekarang
                    </button>
                  </div>
        
                  {/* Dots Indicator */}
                  <div className="mt-4 flex justify-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white"></span>
                    <span className="h-2 w-2 rounded-full bg-white/40"></span>
                    <span className="h-2 w-2 rounded-full bg-white/40"></span>
                  </div>
                </div>
        
    );
}

export default Recomendations;
