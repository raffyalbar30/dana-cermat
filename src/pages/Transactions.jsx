import Cards from "../component/Cards";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import Transactional from "../layouts/Transactional";

export default function Transactions() {
  return (
    <div className="w-full flex-wrap">
            <div className="bg-slate-50 p-6 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Cards
                    title="Total Income"
                    value="$4,200"
                    desc="+12% from last month"
                    color="text-green-600"
                    icons={<IoIosTrendingUp/>}
                    />
                    <Cards
                    title="Total Expenses"
                    value="$3,190"
                    desc="-8% from last month"
                    color="text-red-500"
                    icons={<IoIosTrendingDown/>}
                    />
                    <Cards
                    title="Net Belance"
                    value="$1,010"
                    desc="24.0% form last month"
                    color="text-blue-600"
                    icons={<GiReceiveMoney/>}
                    />
            </div>
            <div className="w-full">
                <Transactional/>
            </div>
        </div>
    </div>
  )
}
