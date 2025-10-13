// File: app/users/create/page.tsx - Create User Page
"use client";
import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/lib/userContext";

const CreateUserPage: React.FC = () => {
  const router = useRouter();
  const { users, setUsers } = useUserContext();
  const { toast } = useToast();
  const [editedUser, setEditedUser] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "User",
    status: true,
  });

  const handleFormChange = (field: keyof User, value: string | boolean) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const saveUser = () => {
    if (editedUser.name && editedUser.email) {
      const newId = Math.max(...users.map((u) => u.id), 0) + 1;
      const now = new Date();
      const entry = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${now.getFullYear()} ${now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;
      const newUser: User = {
        id: newId,
        entry,
        ...editedUser,
      } as User;
      setUsers((prev) => [...prev, newUser]);
      toast({
        title: "User Created",
        description: "A new user has been added.",
      });
      router.push("/users");
    } else {
      toast({
        title: "Validation Error",
        description: "Name and Email are required.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-2xl mx-auto bg-gray-50 rounded-xl shadow-lg">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Users
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Add New User</h1>
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editedUser.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              className="mt-1 border-gray-300 focus:border-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={editedUser.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              className="mt-1 border-gray-300 focus:border-blue-500"
            />
          </div>
          <div>
            <Label>Role</Label>
            <Select value={editedUser.role} onValueChange={(value) => handleFormChange("role", value)}>
              <SelectTrigger className="mt-1 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Label>Status</Label>
            <Switch
              checked={editedUser.status}
              onCheckedChange={(checked) => handleFormChange("status", checked)}
              className="data-[state=checked]:bg-green-500"
            />
            <span className={editedUser.status ? "text-green-600" : "text-red-600"}>
              {editedUser.status ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={saveUser} className="bg-blue-600 hover:bg-blue-700">
              Create User
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateUserPage;