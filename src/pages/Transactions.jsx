import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import Transactional from "../layouts/Transactional";
import AllCards from "../component/Cards";


export default function Transactions() {

  return (
    <div className="w-full flex-wrap">
            <div className="bg-slate-50 p-6 min-h-screen">
            <AllCards/>
            <div className="w-full">
                <Transactional/>
            </div>
        </div>
    </div>
  )
}
