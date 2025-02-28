"use client";
import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Edit, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Star, 
  Trash2, 
  UserPlus 
} from "lucide-react";

// Define VIP User type
interface VIPUser {
  id: number;
  name: string;
  email: string;
  plan: string;
  amountPaid: string;
  paymentDate: string;
  status?: string;
}

const VIPPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Extended vip users data with more details
  const vipUsers: VIPUser[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      plan: "Platinum VIP",
      amountPaid: "$99.99",
      paymentDate: "2025-02-01",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      plan: "Gold VIP",
      amountPaid: "$69.99",
      paymentDate: "2025-01-28",
      status: "Active",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      plan: "Silver VIP",
      amountPaid: "$39.99",
      paymentDate: "2025-01-25",
      status: "Active",
    },
    {
      id: 4,
      name: "Robert Davis",
      email: "robert@example.com",
      plan: "Platinum VIP",
      amountPaid: "$99.99",
      paymentDate: "2025-02-05",
      status: "Pending",
    },
    {
      id: 5,
      name: "Emily Wilson",
      email: "emily@example.com",
      plan: "Gold VIP",
      amountPaid: "$69.99",
      paymentDate: "2025-01-30",
      status: "Active",
    },
    {
      id: 6,
      name: "Michael Brown",
      email: "michael@example.com",
      plan: "Silver VIP",
      amountPaid: "$39.99",
      paymentDate: "2025-01-29",
      status: "Expired",
    },
  ];

  // Filter users based on search and selected plan
  const filteredUsers = vipUsers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan = selectedPlan ? user.plan === selectedPlan : true;

    return matchesSearch && matchesPlan;
  });

  // Get unique plans for the filter
  const uniquePlans = Array.from(new Set(vipUsers.map(user => user.plan)));

  // Function to get plan badge color
  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case "Platinum VIP":
        return "bg-gradient-to-r from-purple-600 to-indigo-600 text-white";
      case "Gold VIP":
        return "bg-gradient-to-r from-amber-500 to-yellow-400 text-white";
      case "Silver VIP":
        return "bg-gradient-to-r from-gray-400 to-slate-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Function to get plan icon
  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "Platinum VIP":
        return <Crown className="h-4 w-4 mr-1" />;
      case "Gold VIP":
        return <Star className="h-4 w-4 mr-1 text-amber-400" />;
      case "Silver VIP":
        return <Star className="h-4 w-4 mr-1 text-gray-400" />;
      default:
        return null;
    }
  };

  // Function to get status badge styling
  const getStatusBadge = (status: string | undefined) => {
    if (!status) return null;
    
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-3xl font-bold flex items-center">
                  <Crown className="mr-2 h-6 w-6" />
                  VIP Membership
                </CardTitle>
                <CardDescription className="text-indigo-100 mt-2">
                  Manage exclusive VIP memberships and subscription plans
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white text-indigo-700 hover:bg-indigo-100">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add VIP Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New VIP Member</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new VIP member below.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Form would go here in a real application */}
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <Input id="name" placeholder="Enter member name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="plan" className="text-sm font-medium">VIP Plan</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="">Select a plan</option>
                        <option value="platinum">Platinum VIP ($99.99)</option>
                        <option value="gold">Gold VIP ($69.99)</option>
                        <option value="silver">Silver VIP ($39.99)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Add Member</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search members..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      {selectedPlan || "Filter by Plan"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedPlan(null)}>
                      All Plans
                    </DropdownMenuItem>
                    {uniquePlans.map((plan) => (
                      <DropdownMenuItem 
                        key={plan} 
                        onClick={() => setSelectedPlan(plan)}
                        className="flex items-center"
                      >
                        {getPlanIcon(plan)}
                        {plan}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Plan
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-indigo-50">
                      <TableHead className="font-bold text-indigo-900">Member</TableHead>
                      <TableHead className="font-bold text-indigo-900">Email</TableHead>
                      <TableHead className="font-bold text-indigo-900">Plan</TableHead>
                      <TableHead className="font-bold text-indigo-900 text-right">Amount</TableHead>
                      <TableHead className="font-bold text-indigo-900">Payment Date</TableHead>
                      <TableHead className="font-bold text-indigo-900">Status</TableHead>
                      <TableHead className="font-bold text-indigo-900 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No VIP members found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-indigo-50 transition-colors">
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="text-gray-600">{user.email}</TableCell>
                          <TableCell>
                            <div className={`rounded-full px-3 py-1 text-xs font-semibold inline-flex items-center ${getPlanBadgeColor(user.plan)}`}>
                              {getPlanIcon(user.plan)}
                              {user.plan}
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-emerald-600 text-right">{user.amountPaid}</TableCell>
                          <TableCell>{user.paymentDate}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>
                            <div className="flex justify-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="flex items-center cursor-pointer">
                                    <Edit className="mr-2 h-4 w-4 text-indigo-600" />
                                    <span>Edit Member</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center cursor-pointer">
                                    <Crown className="mr-2 h-4 w-4 text-amber-500" />
                                    <span>Change Plan</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center cursor-pointer text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Remove</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {vipUsers.length} VIP members
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="text-gray-700">Previous</Button>
                <Button variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-200">1</Button>
                <Button variant="outline" className="text-gray-700">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VIPPlansPage;