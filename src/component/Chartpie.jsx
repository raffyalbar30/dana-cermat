import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { ChartPie } from "../services/chart";
import { useEffect, useState } from "react";

const COLORS = {
  Food: "#A855F7",
  Transport: "#22C55E",
  Shopping: "#F59E0B",
  Bills: "#EF4444",
  Entertainment: "#3B82F6",
  Health: "#EC4899",
  Education: "#06B6D4",
  Others: "#94A3B8",
};

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const ExpensePieChart = () => {
  const Token = sessionStorage.getItem("Token");

  // STATE harus berada di dalam component
  const [monthly, setMonthly] = useState([]);

  // API request
  useEffect(() => {
    const getCategoriesExpanses = async () => {
      try {
        const response = await ChartPie("1m", Token);

        console.log("Response:", response);

        setMonthly(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getCategoriesExpanses();
  }, [Token]);

  // Convert data API
  const chartData = monthly.map((item) => ({
    category: item.category,
    expenses: Number(item.expenses),
    percentage: Number(item.percentage),
  }));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    const data = payload[0].payload;

    return (
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
        <p className="mb-1 font-semibold text-slate-700">
          {data.category}
        </p>

        <p className="text-sm text-slate-500">
          {formatRupiah(data.expenses)}
        </p>

        <p className="text-sm font-medium text-slate-700">
          {data.percentage}%
        </p>
      </div>
    );
  };

  // Custom Legend
  const CustomLegend = ({ payload }) => {
    if (!payload) return null;

    return (
      <div className="mt-2 flex flex-col gap-2">
        {payload.map((entry) => {
          const item = chartData.find(
            (data) => data.category === entry.value
          );

          return (
            <div
              key={entry.value}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: entry.color,
                  }}
                />

                <span className="text-slate-500">
                  {entry.value}
                </span>
              </div>

              <span className="text-slate-500">
                {item?.percentage}%
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-5">
      {/* Chart */}
      <div className="h-[300px] w-full mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="expenses"
              nameKey="category"
              cx="50%"
              cy="42%"
              outerRadius={95}
              paddingAngle={0}
              labelLine={false}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[entry.category] || COLORS.Others}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              content={<CustomLegend />}
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensePieChart;