"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  notes?: string;
}

const EditReportedUserPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState<ReportedUser | null>(null);

  useEffect(() => {
    // Sample data - in a real app, this would come from an API
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
    if (selectedUser) {
      setUser({ ...selectedUser, notes: "" });
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user data via API
    router.push("/reported-users");
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
              Edit User Report
            </CardTitle>
            <CardDescription>Modify the reported user details</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={user.userId}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={user.gender}
                    onValueChange={(value) =>
                      setUser({ ...user, gender: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Non-binary">Non-binary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="userType">User Type</Label>
                  <Select
                    value={user.userType}
                    onValueChange={(value) =>
                      setUser({ ...user, userType: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom</SelectItem>
                      <SelectItem value="livestream">Livestream</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Report Reason</Label>
                  <Input
                    id="message"
                    value={user.message}
                    onChange={(e) =>
                      setUser({ ...user, message: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="requestedAt">Reported At</Label>
                  <Input
                    id="requestedAt"
                    value={user.requestedAt}
                    disabled
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={user.notes || ""}
                  onChange={(e) => setUser({ ...user, notes: e.target.value })}
                  className="w-full mt-1 p-2 border rounded-md text-sm"
                  rows={4}
                  placeholder="Add reviewer notes here..."
                />
              </div>
              <div className="flex justify-between">
                <Link href="/reported-users">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditReportedUserPage;
