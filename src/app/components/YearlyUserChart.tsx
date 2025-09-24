"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface YearlyUserData {
  year: string;
  users: number;
}

interface YearlyUserChartProps {
  data: YearlyUserData[];
}

const YearlyUserChart: React.FC<YearlyUserChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Yearly User Growth</h2>
      
      {/* Responsive chart container */}
      <div className="h-64 sm:h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ 
              top: 10, 
              right: 10, 
              left: 20, 
              bottom: 20 
            }}
          >
            <CartesianGrid 
              stroke="#E5E7EB" 
              strokeDasharray="3 3" 
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{ 
                fill: '#6B7280', 
                fontSize: 12,
                fontWeight: 500
              }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
              tickFormatter={(value) => value.substring(0, 4)} // Show only 4 characters for year
            />
            <YAxis
              tick={{ 
                fill: '#6B7280', 
                fontSize: 12,
                fontWeight: 500
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ fontWeight: 500 }}
            />
            <Bar
              dataKey="users"
              fill="#6366F1"
              radius={[4, 4, 0, 0]}
              barSize={16}
              label={{ 
                position: 'top', 
                fill: '#4B5563', 
                fontSize: 12,
                fontWeight: 500
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearlyUserChart;