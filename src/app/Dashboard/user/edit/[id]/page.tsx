"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useUserContext, User } from "@/lib/userContext";
import { ArrowLeft } from "lucide-react";

const UserEditPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);
  const { users, setUsers } = useUserContext();
  const { toast } = useToast();

  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the user by ID
    const user = users.find((u) => u.id === userId);
    if (user) {
      setFormData(user);
      setLoading(false);
    } else {
      toast({
        title: "User Not Found",
        description: "The requested user does not exist.",
        variant: "destructive",
      });
      router.push("/Dashboard/user");
    }
  }, [userId, users, router, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => (prev ? { ...prev, role: value } : null));
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData((prev) => (prev ? { ...prev, status: checked } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Update user in context
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? formData : user))
    );

    toast({
      title: "User Updated",
      description: "User information has been successfully updated.",
    });

    router.push("/Dashboard/user");
  };

  const handleCancel = () => {
    router.push("/Dashboard/user");
  };

  if (loading || !formData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={handleCancel} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit User</CardTitle>
            <CardDescription>
              Update user information and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter user name"
                    className="border-gray-300"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter email address"
                    className="border-gray-300"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Entry Date (Read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="entry">Entry Date</Label>
                  <Input
                    id="entry"
                    name="entry"
                    type="text"
                    value={formData.entry}
                    disabled
                    className="border-gray-300 bg-gray-50"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="space-y-0.5">
                  <Label htmlFor="status" className="text-base">
                    Account Status
                  </Label>
                  <p className="text-sm text-gray-500">
                    Enable or disable user access
                  </p>
                </div>
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={handleStatusChange}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserEditPage;
