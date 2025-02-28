"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthlyUserData {
  month: string;
  users: number;
}

interface MonthlyUserChartProps {
  data: MonthlyUserData[];
}

const MonthlyUserChart: React.FC<MonthlyUserChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly User Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            label={{ value: 'Month', position: 'insideBottomRight', offset: 0, fill: '#6B7280' }}
          />
          <YAxis
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            label={{ value: 'Number of Users', angle: -90, position: 'insideLeft', fill: '#6B7280' }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="users"
            fill="#818CF8"
            radius={[4, 4, 0, 0]}
            label={{ position: 'top', fill: '#4B5563' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyUserChart;