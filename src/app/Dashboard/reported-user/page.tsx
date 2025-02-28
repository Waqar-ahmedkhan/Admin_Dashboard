"use client"

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, MoreVertical, Filter, UserX, Download } from 'lucide-react';

interface ReportedUser {
  id: number;
  userId: number;
  name: string;
  message: string;
  gender: string;
  userType: string;
  requestedAt: string;
}

const ReportedUserPage: React.FC = () => {
  // Sample data for reported users
  const [reportedUsers, setReportedUsers] = useState<ReportedUser[]>([
    {
      id: 1,
      userId: 20,
      name: 'John Doe',
      message: 'False gender',
      gender: 'Male',
      userType: 'custom',
      requestedAt: '2024-12-19 17:35:03',
    },
    {
      id: 2,
      userId: 18,
      name: 'Jane Smith',
      message: 'False gender',
      gender: 'Female',
      userType: 'custom',
      requestedAt: '2024-12-19 17:36:50',
    },
    {
      id: 3,
      userId: 19,
      name: 'Alex Johnson',
      message: 'False gender',
      gender: 'Non-binary',
      userType: 'custom',
      requestedAt: '2024-12-19 20:37:08',
    },
    {
      id: 4,
      userId: 18,
      name: 'Sam Wilson',
      message: 'Fraud',
      gender: 'Male',
      userType: 'custom',
      requestedAt: '2024-12-19 21:04:35',
    },
    {
      id: 5,
      userId: 13,
      name: 'Taylor Swift',
      message: 'Fraud',
      gender: 'Female',
      userType: 'livestream',
      requestedAt: '2024-12-19 21:30:26',
    },
    {
      id: 6,
      userId: 39,
      name: 'Riley Cooper',
      message: 'Hate Speech',
      gender: 'Female',
      userType: 'custom',
      requestedAt: '2024-12-23 11:48:47',
    },
  ]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedUser, setSelectedUser] = useState<ReportedUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle Approve action
  const handleApprove = (userId: number) => {
    setReportedUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
  };

  // Handle Reject action
  const handleReject = (userId: number) => {
    setReportedUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
  };

  // Handle user details view
  const handleViewDetails = (user: ReportedUser) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Filter users based on search term and filter type
  const filteredUsers = reportedUsers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId.toString().includes(searchTerm);
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && user.userType === filterType;
  });

  // Format date for better display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">Reported Users</CardTitle>
                <CardDescription>
                  Review and manage user reports across the platform
                </CardDescription>
              </div>
              <Button variant="outline" className="gap-2">
                <Download size={16} />
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, ID or report reason..."
                  className="pl-10 pr-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      <SelectValue placeholder="Filter by type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                    <SelectItem value="livestream">Livestream</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-blue-600">Total Reports</p>
                  <h3 className="text-2xl font-bold">{reportedUsers.length}</h3>
                </CardContent>
              </Card>
              <Card className="bg-amber-50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-amber-600">Pending Review</p>
                  <h3 className="text-2xl font-bold">{reportedUsers.length}</h3>
                </CardContent>
              </Card>
              <Card className="bg-red-50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-red-600">Critical Reports</p>
                  <h3 className="text-2xl font-bold">
                    {reportedUsers.filter(u => u.message === "Hate Speech").length}
                  </h3>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Report Reason</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Reported At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        <UserX className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                        No reported users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">#{user.userId}</TableCell>
                        <TableCell>{user.name || "Unknown"}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.message === "Hate Speech" ? "destructive" : "outline"}
                            className="capitalize"
                          >
                            {user.message}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className="capitalize"
                          >
                            {user.userType}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.requestedAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(user)}
                            >
                              View
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem 
                                  onClick={() => handleApprove(user.userId)}
                                  className="text-green-600"
                                >
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleReject(user.userId)}
                                  className="text-red-600"
                                >
                                  Reject
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

            {/* Pagination (simplified) */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button 
                variant="outline" 
                size="sm" 
                disabled
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-blue-50"
              >
                1
              </Button>
              <Button 
                variant="outline" 
                size="sm"
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>User Report Details</DialogTitle>
              <DialogDescription>
                Review detailed information about this reported user.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">User ID</Label>
                  <p className="font-medium">#{selectedUser.userId}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Name</Label>
                  <p className="font-medium">{selectedUser.name || "Unknown"}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Gender</Label>
                  <p className="font-medium">{selectedUser.gender || "Not specified"}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">User Type</Label>
                  <p className="font-medium capitalize">{selectedUser.userType}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Report Reason</Label>
                  <p className="font-medium">{selectedUser.message}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Reported At</Label>
                  <p className="font-medium">{formatDate(selectedUser.requestedAt)}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Label className="text-xs text-gray-500">Notes</Label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded-md text-sm" 
                  rows={3}
                  placeholder="Add reviewer notes here..."
                />
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button 
                variant="destructive" 
                onClick={() => {
                  handleReject(selectedUser.userId);
                  setIsDialogOpen(false);
                }}
              >
                Reject User
              </Button>
              <Button 
                onClick={() => {
                  handleApprove(selectedUser.userId);
                  setIsDialogOpen(false);
                }}
              >
                Approve User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default ReportedUserPage;