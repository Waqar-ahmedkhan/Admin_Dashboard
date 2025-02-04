import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface UsersByCountryProps {
  data: { country: string; users: number; date?: string; month?: string; year?: string }[];
  timeFrame: "daily" | "monthly" | "yearly";
}

const UsersByCountryChart: React.FC<UsersByCountryProps> = ({ data, timeFrame }) => {
  // Determine the XAxis dataKey based on the timeFrame

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Users by Country ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Data)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis type="category" dataKey="country" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#4F46E5" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersByCountryChart;
