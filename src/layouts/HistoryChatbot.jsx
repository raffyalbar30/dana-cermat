import { IoChatboxEllipsesOutline } from "react-icons/io5";


const HistoryChatbot = () => {
    return (
    <div className="rounded-2xl bg-white mt-12 p-5 shadow-lg  shadow-gray-400">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <IoChatboxEllipsesOutline className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-lg">Notifications</h3>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400">
        <IoChatboxEllipsesOutline className="w-10 h-10 mb-3" />
        <p className="text-sm">No chat history yet</p>
      </div>

      {/* Footer */}
      <div className="text-center">
        <button className="text-sm font-medium text-blue-600 hover:underline">
          Scroll All Chat Histories
        </button>
      </div>
    </div>

    );
}

export default HistoryChatbot;
