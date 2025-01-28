// pages/DashboardPage.tsx
"use client"
import React from 'react';
import Card from "../components/Card";
import DashboardLayout from "../components/DashboardLayout";
import MonthlyUserChart from "../components/MonthlyUserChart";
import YearlyUserChart from "../components/YearlyUserChart";
import PremiumUsers from "../components/PremiumUsers";
import RecentUsers from "../components/RecentUser";
import RecentlyContactedUsers from "../components/RecentlyContactedUser";

interface MonthlyUserData {
  month: string;
  users: number;
}

interface YearlyUserData {
  year: string;
  users: number;
}

interface PremiumUser {
  id: number;
  name: string;
  email: string;
  subscriptionDate: string;
  plan: string;
}

interface RecentUser {
  id: number;
  name: string;
  email: string;
  signupDate: string;
}

interface ContactedUser {
  id: number;
  name: string;
  email: string;
  lastContacted: string;
}

const DashboardPage: React.FC = () => {
  // Sample data for monthly and yearly users
  const monthlyUserData: MonthlyUserData[] = [
    { month: 'Jan', users: 10 },
    { month: 'Feb', users: 20 },
    { month: 'Mar', users: 30 },
    { month: 'Apr', users: 40 },
    { month: 'May', users: 50 },
    { month: 'Jun', users: 60 },
    { month: 'Jul', users: 70 },
    { month: 'Aug', users: 80 },
    { month: 'Sep', users: 90 },
    { month: 'Oct', users: 100 },
    { month: 'Nov', users: 110 },
    { month: 'Dec', users: 120 },
  ];

  const yearlyUserData: YearlyUserData[] = [
    { year: '2020', users: 500 },
    { year: '2021', users: 700 },
    { year: '2022', users: 900 },
    { year: '2023', users: 1100 },
    { year: '2024', users: 1300 },
  ];

  // Sample data for premium users
  const premiumUsers: PremiumUser[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', subscriptionDate: '2025-01-15', plan: 'Premium' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subscriptionDate: '2025-01-10', plan: 'Premium' },
  ];

  // Sample data for recent users
  const recentUsers: RecentUser[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', signupDate: '2025-01-20' },
    { id: 2, name: 'Bob Brown', email: 'bob@example.com', signupDate: '2025-01-19' },
  ];

  // Sample data for recently contacted users
  const recentlyContactedUsers: ContactedUser[] = [
    { id: 1, name: 'Charlie Davis', email: 'charlie@example.com', lastContacted: '2025-01-18' },
    { id: 2, name: 'Diana Evans', email: 'diana@example.com', lastContacted: '2025-01-17' },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="TODAY USERS" value="1" />
        <Card title="TOTAL USERS" value="161" />
        <Card title="VIP USERS" value="3" />
        <Card title="TODAY USERS" value="1" />
        <Card title="TOTAL USERS" value="161" />
        <Card title="VIP USERS" value="3" />
        <Card title="TODAY USERS" value="1" />
        <Card title="TOTAL USERS" value="161" />
        <Card title="VIP USERS" value="3" />
      </div>

      <MonthlyUserChart data={monthlyUserData} />
      <YearlyUserChart data={yearlyUserData} />
      <PremiumUsers users={premiumUsers} />
      <RecentUsers users={recentUsers} />
      <RecentlyContactedUsers users={recentlyContactedUsers} />
    </DashboardLayout>
  );
};

export default DashboardPage;