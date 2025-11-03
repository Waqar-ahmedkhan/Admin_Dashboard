"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReportedUser {
  id: number;
  userId: number;
  name: string;
  message: string;
  gender: string;
  userType: string;
  requestedAt: string;
  status: string;
}

const ReportedUsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<ReportedUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<ReportedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and set sample data
    const loadUsers = () => {
      const sampleUsers: ReportedUser[] = [
        {
          id: 1,
          userId: 20,
          name: "John Doe",
          message: "False gender",
          gender: "Male",
          userType: "custom",
          requestedAt: "2024-12-19 17:35:03",
          status: "pending",
        },
        {
          id: 2,
          userId: 18,
          name: "Jane Smith",
          message: "False gender",
          gender: "Female",
          userType: "custom",
          requestedAt: "2024-12-19 17:36:50",
          status: "pending",
        },
        {
          id: 3,
          userId: 19,
          name: "Alex Johnson",
          message: "False gender",
          gender: "Non-binary",
          userType: "custom",
          requestedAt: "2024-12-19 20:37:08",
          status: "pending",
        },
        {
          id: 4,
          userId: 18,
          name: "Sam Wilson",
          message: "Fraud",
          gender: "Male",
          userType: "custom",
          requestedAt: "2024-12-19 21:04:35",
          status: "reviewed",
        },
        {
          id: 5,
          userId: 13,
          name: "Taylor Swift",
          message: "Fraud",
          gender: "Female",
          userType: "livestream",
          requestedAt: "2024-12-19 21:30:26",
          status: "pending",
        },
        {
          id: 6,
          userId: 39,
          name: "Riley Cooper",
          message: "Hate Speech",
          gender: "Female",
          userType: "custom",
          requestedAt: "2024-12-23 11:48:47",
          status: "pending",
        },
        {
          id: 7,
          userId: 45,
          name: "Michael Brown",
          message: "Inappropriate Content",
          gender: "Male",
          userType: "livestream",
          requestedAt: "2024-12-24 09:15:22",
          status: "pending",
        },
        {
          id: 8,
          userId: 52,
          name: "Sarah Davis",
          message: "Spam",
          gender: "Female",
          userType: "custom",
          requestedAt: "2024-12-25 14:20:11",
          status: "reviewed",
        },
      ];

      setUsers(sampleUsers);
      setFilteredUsers(sampleUsers);
      setLoading(false);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userId.toString().includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-500 text-white",
      reviewed: "bg-blue-500 text-white",
      approved: "bg-green-500 text-white",
      rejected: "bg-red-500 text-white",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          statusColors[status] || "bg-gray-200"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleView = (id: number) => {
    router.push(`/Dashboard/reported-user/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/Dashboard/reported-user/edit/${id}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <CardTitle className="text-3xl font-bold text-gray-800">
                  Reported Users
                </CardTitle>
                <CardDescription className="mt-2">
                  Manage and review reported user accounts
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {filteredUsers.length} Reports
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by name, user ID, or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {users.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">
                  No reported users available
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-md border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        User ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Report Reason
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Gender
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                        Reported At
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            #{user.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            #{user.userId}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {user.message}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {user.gender}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className="capitalize text-xs"
                            >
                              {user.userType}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            {getStatusBadge(user.status)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                            {formatDate(user.requestedAt)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2 justify-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleView(user.id)}
                                className="hover:bg-blue-50"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(user.id)}
                                className="hover:bg-green-50"
                                title="Edit Report"
                              >
                                <Edit className="h-4 w-4 text-green-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          No reported users found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportedUsersPage;
