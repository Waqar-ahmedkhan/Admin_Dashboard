"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  LabelList,
} from "recharts";
import { TooltipProps } from "recharts"; // Fixed: Proper type for tooltip props

interface UsersByCountryProps {
  data: { country: string; users: number; date?: string; month?: string; year?: string }[];
  timeFrame: "daily" | "monthly" | "yearly";
  title?: string;
  isLoading?: boolean;
}

// Professional, harmonious color palette
const COLORS = [
  "#3B82F6", // Blue-500
  "#8B5CF6", // Violet-500
  "#EC4899", // Pink-500
  "#10B981", // Emerald-500
  "#F59E0B", // Amber-500
  "#EF4444", // Red-500
  "#06B6D4", // Cyan-500
  "#6366F1", // Indigo-500
];

const getFlagEmoji = (country: string): string => {
  const flags: Record<string, string> = {
    "United States": "🇺🇸",
    India: "🇮🇳",
    "United Kingdom": "🇬🇧",
    Canada: "🇨🇦",
    Australia: "🇦🇺",
    Germany: "🇩🇪",
    France: "🇫🇷",
    Japan: "🇯🇵",
    Brazil: "🇧🇷",
    Mexico: "🇲🇽",
  };
  return flags[country] || "🌍";
};

const UsersByCountryChart: React.FC<UsersByCountryProps> = ({
  data,
  timeFrame,
  title = "Users by Country",
  isLoading = false,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-6"></div>
        <div className="w-full h-72 bg-gray-100 rounded-xl"></div>
      </div>
    );
  }

  const formattedTimeFrame = timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1);

  // Fixed: Proper type for tooltip props
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-xl border border-gray-700 min-w-[12rem]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{getFlagEmoji(label as string)}</span>
            <p className="font-bold">{label as string}</p>
          </div>
          <div className="bg-gray-800 p-2 rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Users:</span>{" "}
              <span className="text-blue-300 font-bold">
                {(payload[0].value as number).toLocaleString()}
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-1">{formattedTimeFrame} Data</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Find top country
  const topCountry =
    data.length > 0
      ? data.reduce((prev, current) => (prev.users > current.users ? prev : current)).country
      : "";

  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);

  return (
    <div className="bg-white/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Header with proper spacing and mobile responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
        <span className="mt-2 sm:mt-0 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
          {formattedTimeFrame}
        </span>
      </div>

      {/* Chart container with proper responsive heights */}
      <div className="h-[20rem] sm:h-[16rem] md:h-[22rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: isMobile ? 10 : 20,
              left: isMobile ? 60 : 100,
              bottom: 20,
            }}
            barCategoryGap="12%"
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#f1f1f1"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "#6B7280", fontSize: isMobile ? 10 : 11 }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis
              type="category"
              dataKey="country"
              width={isMobile ? 60 : 100}
              tick={{
                fill: "#1F2937",
                fontSize: isMobile ? 10 : 12,
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: string) =>
                isMobile && value.length > 8 ? `${value.substring(0, 6)}...` : value
              }
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(59, 130, 246, 0.08)" }}
              wrapperStyle={{ outline: "none" }}
            />
            <Bar
              dataKey="users"
              barSize={isMobile ? 16 : 24}
              radius={[0, 6, 6, 0]}
              isAnimationActive
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={1}
                  className="drop-shadow-sm hover:brightness-110 transition-all duration-200"
                />
              ))}
              <LabelList
                dataKey="users"
                position="right"
                fill="#374151"
                fontSize={isMobile ? 9 : 11}
                fontWeight={600}
                formatter={(value: number) => value.toLocaleString()}
                offset={8}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats with better mobile spacing */}
      {data.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">{getFlagEmoji(topCountry)}</span>
            <span className="font-medium text-gray-700">Top: {topCountry}</span>
          </div>
          <div className="mt-2 sm:mt-0">
            <span className="font-medium">Total:</span>{" "}
            <span className="font-bold text-blue-600">{totalUsers.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersByCountryChart;