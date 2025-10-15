"use client";
import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
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
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
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
  Plus,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUserContext, User } from "@/lib/userContext";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];
const DEFAULT_ITEMS_PER_PAGE = ITEMS_PER_PAGE_OPTIONS[0];

const UserListPage: React.FC = () => {
  const { users, setUsers } = useUserContext();
  const [search, setSearch] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    DEFAULT_ITEMS_PER_PAGE
  );
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof User>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();
  const router = useRouter();

  // Delete modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Parse entry date string to Date for sorting
  const parseEntry = (entry: string): Date => {
    const [datePart, timePart, ampm] = entry.split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hour, minute] = timePart.split(":").map(Number); // Use const
    let hourAdjusted = hour;
    if (ampm === "PM" && hour !== 12) hourAdjusted += 12;
    if (ampm === "AM" && hour === 12) hourAdjusted = 0;
    return new Date(year, month - 1, day, hourAdjusted, minute);
  };

  // Type-safe property access
  const getUserProperty = <K extends keyof User>(
    user: User,
    key: K
  ): User[K] => {
    return user[key];
  };

  // Filter users
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter) &&
      (statusFilter === "all" ||
        (statusFilter === "active" ? user.status : !user.status))
  );

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let va: User[keyof User] | Date = getUserProperty(a, sortField);
    let vb: User[keyof User] | Date = getUserProperty(b, sortField);

    if (sortField === "entry") {
      va = parseEntry(va as string);
      vb = parseEntry(vb as string);
    } else if (sortField === "status") {
      va = va ? 1 : 0;
      vb = vb ? 1 : 0;
    } else if (sortField === "id") {
      va = va as number;
      vb = vb as number;
    } else {
      va = (va as string).toLowerCase();
      vb = (vb as string).toLowerCase();
    }

    if (va < vb) return sortOrder === "asc" ? -1 : 1;
    if (va > vb) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Toggle selection
  const handleSelect = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentPageIds = paginatedUsers.map((user) => user.id);
    const allSelected = currentPageIds.every((id) =>
      selectedUsers.includes(id)
    );
    if (allSelected) {
      setSelectedUsers((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    } else {
      setSelectedUsers((prev) => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  // Update status for selected
  const updateStatus = (status: boolean) => {
    if (selectedUsers.length === 0) return;
    setUsers((prev) =>
      prev.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status } : user
      )
    );
    setSelectedUsers([]);
    toast({
      title: "Status Updated",
      description: `Selected users have been ${
        status ? "enabled" : "disabled"
      }.`,
    });
  };

  // Toggle single status
  const toggleUserStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
    toast({
      title: "Status Toggled",
      description: "User status has been updated.",
    });
  };

  // Export to CSV
  const exportUsers = () => {
    const headers = ["ID", "Name", "Email", "Role", "Entry Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...sortedUsers.map((user) =>
        [
          user.id,
          user.name,
          user.email,
          user.role,
          user.entry,
          user.status ? "Active" : "Inactive",
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Export Successful",
      description: "Users data has been exported to CSV.",
    });
  };

  // Handle navigation
  const handleView = (id: number) => router.push(`/Dashboard/user/${id}`);
  const handleEdit = (id: number) => router.push(`/Dashboard/user/edit/${id}`);
  const handleCreate = () => router.push("/Dashboard/user/create");

  // Handle delete
  const handleDelete = (user: User) => {
    setCurrentUser(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentUser) {
      setUsers((prev) => prev.filter((u) => u.id !== currentUser.id));
      setDeleteModalOpen(false);
      toast({
        title: "User Deleted",
        description: "The user has been successfully deleted.",
        variant: "destructive",
      });
    }
  };

  // Render pagination
  const renderPaginationItems = () => {
    const items = [];
    const leftSide = currentPage - 2;
    const rightSide = currentPage + 2;

    if (leftSide > 2) items.push(<PaginationEllipsis key="left-ellipsis" />);

    for (
      let i = Math.max(1, leftSide);
      i <= Math.min(totalPages, rightSide);
      i++
    ) {
      items.push(
        <PaginationItem key={i}>
          <Button
            variant={currentPage === i ? "default" : "outline"}
            className="h-9 w-9"
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Button>
        </PaginationItem>
      );
    }

    if (rightSide < totalPages - 1)
      items.push(<PaginationEllipsis key="right-ellipsis" />);

    return items;
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">
          User Management
        </h1>

        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border-gray-300 focus:border-blue-500"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-36 mt-2 sm:mt-0 border-gray-300">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36 mt-2 sm:mt-0 border-gray-300">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              onClick={handleCreate}
              variant="default"
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add User
            </Button>
            <Button
              onClick={exportUsers}
              variant="outline"
              className="gap-2 border-gray-300"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Selection Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {selectedUsers.length > 0 && (
            <>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm border-blue-200 text-blue-600"
              >
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
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-12 text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={
                      paginatedUsers.length > 0 &&
                      paginatedUsers.every((user) =>
                        selectedUsers.includes(user.id)
                      )
                    }
                    onChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead
                  className="min-w-[150px] cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortField === "name" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="inline h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead
                  className="min-w-[200px] cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  {sortField === "email" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="inline h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead
                  className="min-w-[100px] cursor-pointer"
                  onClick={() => handleSort("role")}
                >
                  Role{" "}
                  {sortField === "role" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="inline h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead
                  className="min-w-[150px] cursor-pointer"
                  onClick={() => handleSort("entry")}
                >
                  Entry Date{" "}
                  {sortField === "entry" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="inline h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead
                  className="text-center min-w-[100px] cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status{" "}
                  {sortField === "status" &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="inline h-4 w-4" />
                    ) : (
                      <ArrowDown className="inline h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead className="text-center min-w-[100px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelect(user.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-gray-800">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-gray-600 truncate">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "Staff" ? "secondary" : "outline"
                        }
                        className={
                          user.role === "Staff"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.entry}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={user.status}
                        onCheckedChange={() => toggleUserStatus(user.id)}
                        className={`data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="flex items-center"
                              onClick={() => handleView(user.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center"
                              onClick={() => handleEdit(user.id)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center text-red-600"
                              onClick={() => handleDelete(user)}
                            >
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
        {sortedUsers.length > itemsPerPage && (
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Rows per page:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20 border-gray-300">
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
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, sortedUsers.length)} of{" "}
                {sortedUsers.length}
              </span>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserListPage;
