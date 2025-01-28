// components/MonthlyUserChart.tsx
"use client"
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
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Monthly User Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyUserChart;