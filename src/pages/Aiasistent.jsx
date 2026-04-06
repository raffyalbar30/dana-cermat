import { useState } from "react";
import Recomendations from "../layouts/Recomendations";
import HistoryChatbot from "../layouts/HistoryChatbot";
import Chatbotai from "../layouts/Chatbotai";




export default function ChatBotUI() {
 

  return (
    <div className="flex h-screen w-full   justify-between items-center">
      {/* CHAT CONTAINER */}
       <Chatbotai/>
      {/* Recommended & history chatbot */}
       <div className="flex-col pt-20 h-screen mr-12"> 
           <Recomendations/>
           <HistoryChatbot/>
       </div>

    </div>
  );
}