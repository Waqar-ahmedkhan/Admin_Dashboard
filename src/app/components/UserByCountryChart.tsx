import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";

interface UsersByCountryProps {
  data: { country: string; users: number; date?: string; month?: string; year?: string }[];
  timeFrame: "daily" | "monthly" | "yearly";
}

const colors = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF'];

const UsersByCountryChart: React.FC<UsersByCountryProps> = ({ data, timeFrame }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Users by Country ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Data)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
          <XAxis
            type="number"
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            label={{ value: 'Number of Users', position: 'insideBottomRight', offset: 0, fill: '#6B7280' }}
          />
          <YAxis
            type="category"
            dataKey="country"
            width={100}
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            label={{ value: 'Country', angle: -90, position: 'insideLeft', fill: '#6B7280' }}
          />
          <Tooltip />
          <Bar
            dataKey="users"
            barSize={30}
            radius={[0, 4, 4, 0]}
            label={{ position: 'right', fill: '#4B5563' }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsersByCountryChart;