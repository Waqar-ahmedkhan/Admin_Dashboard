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
import { Label } from "@/components/ui/label";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface ReportedUser {
  id: number;
  userId: number;
  name: string;
  message: string;
  gender: string;
  userType: string;
  requestedAt: string;
}

const CompleteReportedUserPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState<ReportedUser | null>(null);

  useEffect(() => {
    const sampleUsers: ReportedUser[] = [
      {
        id: 1,
        userId: 20,
        name: "John Doe",
        message: "False gender",
        gender: "Male",
        userType: "custom",
        requestedAt: "2024-12-19 17:35:03",
      },
      {
        id: 2,
        userId: 18,
        name: "Jane Smith",
        message: "False gender",
        gender: "Female",
        userType: "custom",
        requestedAt: "2024-12-19 17:36:50",
      },
      {
        id: 3,
        userId: 19,
        name: "Alex Johnson",
        message: "False gender",
        gender: "Non-binary",
        userType: "custom",
        requestedAt: "2024-12-19 20:37:08",
      },
      {
        id: 4,
        userId: 18,
        name: "Sam Wilson",
        message: "Fraud",
        gender: "Male",
        userType: "custom",
        requestedAt: "2024-12-19 21:04:35",
      },
      {
        id: 5,
        userId: 13,
        name: "Taylor Swift",
        message: "Fraud",
        gender: "Female",
        userType: "livestream",
        requestedAt: "2024-12-19 21:30:26",
      },
      {
        id: 6,
        userId: 39,
        name: "Riley Cooper",
        message: "Hate Speech",
        gender: "Female",
        userType: "custom",
        requestedAt: "2024-12-23 11:48:47",
      },
    ];

    const selectedUser = sampleUsers.find((u) => u.id === Number(userId));
    setUser(selectedUser || null);
  }, [userId]);

  const handleApprove = () => {
    // In a real app, this would call an API to approve the user
    router.push("/reported-users");
  };

  const handleReject = () => {
    // In a real app, this would call an API to reject the user
    router.push("/reported-users");
  };

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

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card>
            <CardContent className="p-6">
              <p>User not found</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Complete User Report
            </CardTitle>
            <CardDescription>
              Finalize the action for this reported user
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">User ID</Label>
                  <p className="font-medium">#{user.userId}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Name</Label>
                  <p className="font-medium">{user.name || "Unknown"}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Gender</Label>
                  <p className="font-medium">
                    {user.gender || "Not specified"}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">User Type</Label>
                  <p className="font-medium capitalize">{user.userType}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Report Reason</Label>
                  <p className="font-medium">{user.message}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Reported At</Label>
                  <p className="font-medium">{formatDate(user.requestedAt)}</p>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Link href="/reported-users">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <div className="flex gap-2">
                  <Button variant="destructive" onClick={handleReject}>
                    Reject User
                  </Button>
                  <Button onClick={handleApprove}>Approve User</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CompleteReportedUserPage;
