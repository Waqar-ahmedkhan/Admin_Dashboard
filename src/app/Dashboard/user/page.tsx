"use client";
import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Download, 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  entry: string;
  status: boolean;
}

// Initial Users List
const initialUsers: User[] = [
  {
    id: 1,
    name: "Guest",
    email: "guest_1b40dae75ac29ac8_33@gmail.com",
    role: "User",
    entry: "20/01/2025 12:48 PM",
    status: true,
  },
  {
    id: 2,
    name: "Guest",
    email: "guest_251b76f0d36b4857_87@gmail.com",
    role: "User",
    entry: "20/01/2025 12:41 PM",
    status: true,
  },
  {
    id: 3,
    name: "Guest",
    email: "guest_6d896e956993aceb_19@gmail.com",
    role: "User",
    entry: "20/01/2025 12:28 PM",
    status: true,
  },
  {
    id: 4,
    name: "Asad Mobi Tech",
    email: "asadmobitech@gmail.com",
    role: "Staff",
    entry: "20/01/2025 12:21 PM",
    status: true,
  },
  {
    id: 5,
    name: "Guest",
    email: "guest_1b40dae75ac29ac8_33@gmail.com",
    role: "User",
    entry: "20/01/2025 12:48 PM",
    status: true,
  },
  {
    id: 6,
    name: "Guest",
    email: "guest_251b76f0d36b4857_87@gmail.com",
    role: "User",
    entry: "20/01/2025 12:41 PM",
    status: true,
  },
  {
    id: 8,
    name: "Guest",
    email: "guest_6d896e956993aceb_19@gmail.com",
    role: "User",
    entry: "20/01/2025 12:28 PM",
    status: true,
  },
  {
    id: 11,
    name: "Asad Mobi Tech",
    email: "asadmobitech@gmail.com",
    role: "Staff",
    entry: "20/01/2025 12:21 PM",
    status: true,
  },
  {
    id: 17,
    name: "Guest",
    email: "guest_1b40dae75ac29ac8_33@gmail.com",
    role: "User",
    entry: "20/01/2025 12:48 PM",
    status: true,
  },
  {
    id: 28,
    name: "Guest",
    email: "guest_251b76f0d36b4857_87@gmail.com",
    role: "User",
    entry: "20/01/2025 12:41 PM",
    status: true,
  },
  {
    id: 38,
    name: "Guest",
    email: "guest_6d896e956993aceb_19@gmail.com",
    role: "User",
    entry: "20/01/2025 12:28 PM",
    status: true,
  },
  {
    id: 48,
    name: "Asad Mobi Tech",
    email: "asadmobitech@gmail.com",
    role: "Staff",
    entry: "20/01/2025 12:21 PM",
    status: true,
  },
];

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];
const DEFAULT_ITEMS_PER_PAGE = ITEMS_PER_PAGE_OPTIONS[0];

const UserPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter users based on search, role, and status
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter) &&
      (statusFilter === "all" || (statusFilter === "active" ? user.status : !user.status))
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle selection of a single user
  const handleSelect = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  // Select or Deselect all users on current page
  const handleSelectAll = () => {
    const currentPageIds = paginatedUsers.map(user => user.id);
    const allSelected = currentPageIds.every(id => selectedUsers.includes(id));
    
    if (allSelected) {
      setSelectedUsers(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      const newSelection = [...selectedUsers];
      currentPageIds.forEach(id => {
        if (!newSelection.includes(id)) {
          newSelection.push(id);
        }
      });
      setSelectedUsers(newSelection);
    }
  };

  // Enable or Disable selected users
  const updateStatus = (status: boolean) => {
    if (selectedUsers.length === 0) return;
    
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status } : user
      )
    );
    setSelectedUsers([]); // Clear selection after update
  };

  // Toggle single user status
  const toggleUserStatus = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  };

  // Export users to CSV
  const exportUsers = () => {
    const headers = ["Name", "Email", "Role", "Entry Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredUsers.map(user => 
        [user.name, user.email, user.role, user.entry, user.status ? "Active" : "Inactive"].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">User Management</h1>

        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                className="pl-10 pr-4 py-2"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={exportUsers} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Selection Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {selectedUsers.length > 0 && (
            <>
              <Badge variant="outline" className="px-3 py-1 text-sm">
                {selectedUsers.length} selected
              </Badge>
              
              <Button 
                onClick={() => updateStatus(true)}
                variant="outline"
                className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
              >
                <Check className="mr-2 h-4 w-4" />
                Enable Selected
              </Button>
              
              <Button 
                onClick={() => updateStatus(false)}
                variant="outline"
                className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
              >
                <X className="mr-2 h-4 w-4" />
                Disable Selected
              </Button>
            </>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 text-center">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={
                        paginatedUsers.length > 0 && 
                        paginatedUsers.every(user => selectedUsers.includes(user.id))
                      }
                      onChange={handleSelectAll}
                    />
                  </div>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Entry Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelect(user.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-gray-600 max-w-[200px] truncate">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "Staff" ? "secondary" : "outline"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.entry}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Switch
                          checked={user.status}
                          onCheckedChange={() => toggleUserStatus(user.id)}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
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

        {/* Pagination */}
        {filteredUsers.length > itemsPerPage && (
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1); // Reset to first page
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <Button
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      className="h-9 w-9"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserPage;