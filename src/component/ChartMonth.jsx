import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";


const ChartMonth = ({ data }) => {

    const chartData = data.map((item) => {
    const date = new Date(item.period);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return {
        period: `${day}-${month}-${year}`,
        income: Number(item.income),
        expenses: Number(item.expenses),
    };
   });

   const formatRupiah = (value) => {
    if (value >= 1_000_000) {
        return `Rp.${value / 1_000_000}jt`;
    }

    if (value >= 1_000) {
        return `Rp.${value / 1_000}rb`;
    }

    return `Rp.${value}`;
  };

    return (
        <div className="w-full h-[400px] p-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="period" />

                    <YAxis width={75} tickFormatter={formatRupiah}/>

                    <Tooltip formatter={(value) =>
                        new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                        }).format(value)
                    }
                  />

                    <Legend />

                    <Bar
                        dataKey="income"
                        name="Income"
                        fill="#22c55e"
                    />

                    <Bar
                        dataKey="expenses"
                        name="Expenses"
                        fill="#ef4444"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ChartMonth;
