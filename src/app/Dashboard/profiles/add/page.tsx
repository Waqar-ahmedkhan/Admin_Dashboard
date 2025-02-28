"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../../components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddUserPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    bio: "",
    country: "",
    status: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log("Form Data:", formData);
    router.push("/Dashboard/profiles"); // Redirect to profiles page after submission
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Add New User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              name="gender"
              value={formData.gender}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Bio</Label>
            <Input
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              name="status"
              value={formData.status ? "active" : "inactive"}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value === "active" }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button variant="outline" onClick={() => router.push("/dashboard/profiles")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddUserPage;