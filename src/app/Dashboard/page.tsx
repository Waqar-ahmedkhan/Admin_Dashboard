"use client";

import React, { useState, useMemo } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardLayout from "../components/DashboardLayout";
import MonthlyUserChart from "../components/MonthlyUserChart";
import YearlyUserChart from "../components/YearlyUserChart";
import PremiumUsers from "../components/PremiumUsers";
import RecentUsers from "../components/RecentUser";
import RecentlyContactedUsers from "../components/RecentlyContactedUser";
import UsersByCountryChart from "../components/UserByCountryChart";
import { TrendingUp, Globe, Users, Clock, Crown, ArrowRight, Link } from "lucide-react";

const DashboardPage: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<"daily" | "monthly" | "yearly">("monthly");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const monthlyUserData = [
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

  const yearlyUserData = [
    { year: "2020", users: 500 },
    { year: "2021", users: 700 },
    { year: "2022", users: 900 },
    { year: "2023", users: 1100 },
    { year: "2024", users: 1300 },
  ];

  const premiumUsers = [
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

  const recentUsers = [
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

  const recentlyContactedUsers = [
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

  const usersByCountry = useMemo(() => {
    if (timeFrame === "daily") {
      return [
        { country: "United States", users: 15 },
        { country: "India", users: 18 },
        { country: "United Kingdom", users: 12 },
        { country: "Canada", users: 8 },
        { country: "Australia", users: 7 },
      ];
    } else if (timeFrame === "monthly") {
      return [
        { country: "United States", users: 150 },
        { country: "India", users: 180 },
        { country: "United Kingdom", users: 120 },
        { country: "Canada", users: 85 },
        { country: "Australia", users: 65 },
      ];
    } else {
      return [
        { country: "United States", users: 1800 },
        { country: "India", users: 2100 },
        { country: "United Kingdom", users: 1400 },
        { country: "Canada", users: 1000 },
        { country: "Australia", users: 800 },
      ];
    }
  }, [timeFrame]);

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section - Fully Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <Select 
              value={timeFrame} 
              onValueChange={(value) => setTimeFrame(value as "daily" | "monthly" | "yearly")}
            >
              <SelectTrigger className="w-full sm:w-48 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-lg">
                <SelectValue placeholder="Select Time Frame" />
              </SelectTrigger>
              <SelectContent className="rounded-lg shadow-lg">
                <SelectItem value="daily" className="hover:bg-gray-100 rounded-lg">
                  Daily
                </SelectItem>
                <SelectItem value="monthly" className="hover:bg-gray-100 rounded-lg">
                  Monthly
                </SelectItem>
                <SelectItem value="yearly" className="hover:bg-gray-100 rounded-lg">
                  Yearly
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs Navigation - Modern Design */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-inner rounded-lg transition-all flex items-center justify-center gap-1.5 py-3 text-sm font-medium"
              >
                <TrendingUp className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-inner rounded-lg transition-all flex items-center justify-center gap-1.5 py-3 text-sm font-medium"
              >
                <Globe className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-inner rounded-lg transition-all flex items-center justify-center gap-1.5 py-3 text-sm font-medium"
              >
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="premium" 
                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-inner rounded-lg transition-all flex items-center justify-center gap-1.5 py-3 text-sm font-medium"
              >
                <Crown className="h-4 w-4" />
                Premium
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab - Professional Layout */}
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Users by Country Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <h2 className="text-lg font-semibold text-gray-800">Users by Country</h2>
                    </div>
                    <Link 
                      href="/users-by-country" 
                      className="text-sm font-medium text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                      View all <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="h-[18rem] sm:h-[20rem] p-5">
                    <UsersByCountryChart data={usersByCountry} timeFrame={timeFrame} />
                  </div>
                </div>

                {/* Monthly User Growth Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <h2 className="text-lg font-semibold text-gray-800">Monthly User Growth</h2>
                    </div>
                    <Link 
                      href="/monthly-growth" 
                      className="text-sm font-medium text-green-500 hover:text-green-700 flex items-center gap-1 transition-colors"
                    >
                      View all <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="h-[18rem] sm:h-[20rem] p-5">
                    <MonthlyUserChart data={monthlyUserData} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab - Clean Layout */}
            <TabsContent value="analytics" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Yearly User Growth Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                      <h2 className="text-lg font-semibold text-gray-800">Yearly User Growth</h2>
                    </div>
                    <Link 
                      href="/yearly-growth" 
                      className="text-sm font-medium text-purple-500 hover:text-purple-700 flex items-center gap-1 transition-colors"
                    >
                      View all <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="h-[18rem] sm:h-[20rem] p-5">
                    <YearlyUserChart data={yearlyUserData} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Users Tab - Modern Table Layout */}
            <TabsContent value="users" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
                    </div>
                    <Link 
                      href="/recent-users" 
                      className="text-sm font-medium text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                      View all <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="p-5">
                    <RecentUsers users={recentUsers} />
                  </div>
                </div>

                {/* Recently Contacted Users Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-500" />
                      <h2 className="text-lg font-semibold text-gray-800">Recently Contacted Users</h2>
                    </div>
                    <Link 
                      href="/recently-contacted" 
                      className="text-sm font-medium text-green-500 hover:text-green-700 flex items-center gap-1 transition-colors"
                    >
                      View all <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="p-5">
                    <RecentlyContactedUsers users={recentlyContactedUsers} />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Premium Tab - Professional Layout */}
            <TabsContent value="premium" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Premium Users Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <h2 className="text-lg font-semibold text-gray-800">Premium Users</h2>
                    </div>
                    <Link 
                      href="/premium-users" 
                      className="text-sm font-medium text-yellow-500 hover:text-yellow-700 flex items-center gap-1 transition-colors"
                    >
                      View all <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="p-5">
                    <PremiumUsers users={premiumUsers} />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;