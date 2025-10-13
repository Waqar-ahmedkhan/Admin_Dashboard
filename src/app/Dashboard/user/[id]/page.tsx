// File: app/users/[id]/page.tsx - View User Page
"use client";
import React from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useUserContext } from "@/lib/userContext";

const ViewUserPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { users } = useUserContext();
  const user = users.find((u) => u.id === Number(params.id));

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-6 text-red-600">User not found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-2xl mx-auto bg-gray-50 rounded-xl shadow-lg">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Users
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          User Details
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">
          <div>
            <Label className="text-gray-600">Name</Label>
            <p className="text-gray-800 font-medium mt-1">{user.name}</p>
          </div>
          <div>
            <Label className="text-gray-600">Email</Label>
            <p className="text-gray-800 font-medium mt-1">{user.email}</p>
          </div>
          <div>
            <Label className="text-gray-600">Role</Label>
            <p className="text-gray-800 font-medium mt-1">{user.role}</p>
          </div>
          <div>
            <Label className="text-gray-600">Entry Date</Label>
            <p className="text-gray-800 font-medium mt-1">{user.entry}</p>
          </div>
          <div>
            <Label className="text-gray-600">Status</Label>
            <p
              className={`font-medium mt-1 ${
                user.status ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.status ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewUserPage;
