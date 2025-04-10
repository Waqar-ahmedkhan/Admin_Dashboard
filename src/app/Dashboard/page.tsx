"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import DashboardLayout from "../components/DashboardLayout";
import MonthlyUserChart from "../components/MonthlyUserChart";
import YearlyUserChart from "../components/YearlyUserChart";
import PremiumUsers from "../components/PremiumUsers";
import RecentUsers from "../components/RecentUser";
import RecentlyContactedUsers from "../components/RecentlyContactedUser";
import UsersByCountryChart from "../components/UserByCountryChart";
import { Users, Star, DollarSign, CreditCard, Receipt } from "lucide-react";

interface UsersByCountry {
  country: string;
  users: number;
}

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
  const [timeFrame, setTimeFrame] = useState<"daily" | "monthly" | "yearly">("daily");

  const monthlyUserData: MonthlyUserData[] = [
    { month: "Jan", users: 10 },
    { month: "Feb", users: 20 },
    { month: "Mar", users: 30 },
    { month: "Apr", users: 40 },
    { month: "May", users: 50 },
    { month: "Jun", users: 60 },
    { month: "Jul", users: 70 },
    { month: "Aug", users: 80 },
    { month: "Sep", users: 90 },
    { month: "Oct", users: 100 },
    { month: "Nov", users: 110 },
    { month: "Dec", users: 120 },
  ];

  const yearlyUserData: YearlyUserData[] = [
    { year: "2020", users: 500 },
    { year: "2021", users: 700 },
    { year: "2022", users: 900 },
    { year: "2023", users: 1100 },
    { year: "2024", users: 1300 },
  ];

  const premiumUsers: PremiumUser[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subscriptionDate: "2025-01-15",
      plan: "Premium",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subscriptionDate: "2025-01-10",
      plan: "Premium",
    },
  ];

  const recentUsers: RecentUser[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      signupDate: "2025-01-20",
    },
    {
      id: 2,
      name: "Bob Brown",
      email: "bob@example.com",
      signupDate: "2025-01-19",
    },
  ];

  const recentlyContactedUsers: ContactedUser[] = [
    {
      id: 1,
      name: "Charlie Davis",
      email: "charlie@example.com",
      lastContacted: "2025-01-18",
    },
    {
      id: 2,
      name: "Diana Evans",
      email: "diana@example.com",
      lastContacted: "2025-01-17",
    },
  ];

  const dailyUsersByCountry: UsersByCountry[] = [
    { country: "United States", users: 15 },
    { country: "India", users: 18 },
    { country: "United Kingdom", users: 12 },
  ];

  // Stats cards data with icons, matching the image description
  const statsCards = [
    { title: "TODAY USERS", value: "1", icon: Users },
    { title: "TOTAL USERS", value: "228", icon: Users },
    { title: "VIP USERS", value: "6", icon: Star },
    { title: "TOTAL INCOME", value: "IND 0.0", icon: DollarSign },
    { title: "TOTAL PAYMENT", value: "IND 0.0", icon: CreditCard },
    { title: "WEEKLY PAYMENT", value: "IND 0.0", icon: CreditCard },
    { title: "MONTHLY PAYMENT", value: "IND 1.4K", icon: CreditCard },
    { title: "TOTAL TRANSACTION", value: "IND 0.0", icon: Receipt },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Time Frame Selector */}
        <div className="mb-6">
          <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value as "daily" | "monthly" | "yearly")}>
            <SelectTrigger className="w-36 bg-white border-gray-300">
              <SelectValue placeholder="Select Time Frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((card, index) => (
            <Card key={index} className="bg-white p-4 rounded-lg shadow-md">
              <CardHeader className="flex items-center space-x-2 p-0">
                <card.icon className="h-4 w-4 text-gray-500" />
                <CardTitle className="text-sm font-medium text-gray-500">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <p className="text-2xl font-bold text-black text-center">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Users by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <UsersByCountryChart data={dailyUsersByCountry} timeFrame={timeFrame} />
            </CardContent>
          </Card>

          <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Monthly User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyUserChart data={monthlyUserData} />
            </CardContent>
          </Card>

          <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Yearly User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <YearlyUserChart data={yearlyUserData} />
            </CardContent>
          </Card>

          <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Recently Contacted Users</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentlyContactedUsers users={recentlyContactedUsers} />
            </CardContent>
          </Card>

          <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Premium Users</CardTitle>
            </CardHeader>
            <CardContent>
              <PremiumUsers users={premiumUsers} />
            </CardContent>
          </Card>

          <Card className="bg-white p-4 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentUsers users={recentUsers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;