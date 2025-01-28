// components/YearlyUserChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface YearlyUserData {
  year: string;
  users: number;
}

interface YearlyUserChartProps {
  data: YearlyUserData[];
}

const YearlyUserChart: React.FC<YearlyUserChartProps> = ({ data }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Yearly User Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyUserChart;