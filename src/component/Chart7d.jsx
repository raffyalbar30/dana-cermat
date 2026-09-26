import React from 'react';
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


const Chart7d = ({ data }) => {
    const chartData = data.map((item) => ({
        period: item.period,
        income: Number(item.income),
        expenses: Number(item.expenses),
    }));

    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="period" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="income"
                        name="Income"
                    />

                    <Bar
                        dataKey="expenses"
                        name="Expenses"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart7d;
