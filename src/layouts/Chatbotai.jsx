import { useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";




const Chatbotai = () => {

     const [messages, setMessages] = useState([
    { role: "bot", text: "Halo 👋 Ada yang bisa aku bantu, berikan saya pertanyaan soal masalah keuangan kamu 🤖?" },
    { role: "user", text: "Berikan saya solusi investasi emas dalam 1-3 bulan kedepan" },
  ]);

    return (
        <div className=" border-solid ml-8 border border-slate-200 flex flex-col w-full max-w-3xl h-full md:h-[90vh] bg-white shadow-xl rounded-none md:rounded-xl">

        {/* HEADER */}
        <div className="px-6 py-4 border-b-slate-200 shadow-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            AI
          </div>
          <div>
            <h1 className="font-semibold text-lg">ChatGPT UI</h1>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed
                ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="border-t-slate-200 px-4 py-3 bg-white">
          <div className="flex items-center gap-2 rounded-xl border border-slate-400 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">

            {/* Upload File */}
            <label className="cursor-pointer text-gray-500 hover:text-blue-600 transition">
              <MdAttachFile className="w-6 h-6" />
              <input type="file" className="hidden" />
            </label>

            {/* Input Text */}
            <input
              type="text"
              placeholder="Ketik pesan..."
              className="flex-1 bg-transparent outline-none px-2 text-sm"
            />

            {/* Send Button */}
            <button className="text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg p-2">
              <FaArrowUp className="w-5 h-5" />
            </button>

          </div>
        </div>

      </div>
    );
}

export default Chatbotai;
