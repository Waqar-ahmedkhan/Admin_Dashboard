"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../components/DashboardLayout";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, Edit, Trash2,  Download, Upload, UserPlus, AlertCircle } from "lucide-react";
import Image from "next/image";

interface UserProfile {
  id: number;
  name: string;
  gender: string;
  bio: string;
  country: string;
  status: boolean;
  avatar?: string;
  createdAt: string;
}

const ProfilesPage: React.FC = () => {
  const router = useRouter();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Initialize with sample data
  useEffect(() => {
    const countries = ["Philippines", "Canada", "Germany", "US", "UK", "Japan", "Australia", "France"];
    const bios = [
      "Digital content creator passionate about storytelling",
      "Traveling enthusiast and photography lover",
      "Fitness coach and wellness advocate",
      "Software engineer with 5+ years experience",
      "Art director specializing in brand development",
      "Music producer and sound designer",
      "Entrepreneur building sustainable businesses",
      "Food blogger exploring culinary traditions"
    ];
    
    const sampleData: UserProfile[] = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: ["Anisa", "Andreia", "Andrea", "Anastasia", "Anna", "Alina", "Amanda", "Amy"][i % 8],
      gender: "Female",
      bio: bios[i % 8],
      country: countries[i % 8],
      status: Math.random() > 0.3,
      avatar: `/api/placeholder/32/${(i + 1) * 10}`,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString()
    }));
    
    setProfiles(sampleData);
  }, []);

  const handleSelectProfile = (id: number) => {
    setSelectedProfiles((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProfiles.length === filteredProfiles.length) {
      setSelectedProfiles([]);
    } else {
      setSelectedProfiles(filteredProfiles.map((profile) => profile.id));
    }
  };

  const toggleStatus = (id: number) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id ? { ...profile, status: !profile.status } : profile
      )
    );
  };

  const handleBulkAction = (action: string) => {
    if (action === "toggle") {
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          selectedProfiles.includes(profile.id) ? { ...profile, status: !profile.status } : profile
        )
      );
      setSelectedProfiles([]);
    } else if (action === "delete") {
      setUsersToDelete(selectedProfiles);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    setProfiles((prevProfiles) =>
      prevProfiles.filter((profile) => !usersToDelete.includes(profile.id))
    );
    setSelectedProfiles([]);
    setIsDeleteDialogOpen(false);
  };

  const navigateToAddUser = () => {
    console.log("user pushed to add new user or not ")
    router.push("/Dashboard/profiles/add");
  };

  const navigateToEditUser = (id: number) => {
    router.push(`/Dashboard/profiles/edit/${id}`);
  };

  // Filter profiles based on search and filters
  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch = 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = countryFilter === "all" || profile.country === countryFilter;
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "active" && profile.status) || 
      (statusFilter === "inactive" && !profile.status);
    
    return matchesSearch && matchesCountry && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">User Profiles</CardTitle>
              <CardDescription>
                Manage and monitor all user profiles in the system
              </CardDescription>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button variant="outline" className="gap-2">
                <Download size={16} />
                Export
              </Button>
              <Button variant="outline" className="gap-2">
                <Upload size={16} />
                Import
              </Button>
              <Button onClick={navigateToAddUser} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <UserPlus size={16} />
                Add New User
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-blue-600">Total Users</p>
                  <h3 className="text-2xl font-bold">{profiles.length}</h3>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-green-600">Active</p>
                  <h3 className="text-2xl font-bold">
                    {profiles.filter(p => p.status).length}
                  </h3>
                </CardContent>
              </Card>
              <Card className="bg-red-50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-red-600">Inactive</p>
                  <h3 className="text-2xl font-bold">
                    {profiles.filter(p => !p.status).length}
                  </h3>
                </CardContent>
              </Card>
              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-purple-600">Selected</p>
                  <h3 className="text-2xl font-bold">{selectedProfiles.length}</h3>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name, bio, or country..."
                  className="pl-10 pr-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="Philippines">Philippines</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="US">US</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="France">France</SelectItem>
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
            </div>

            {/* Bulk Actions */}
            {selectedProfiles.length > 0 && (
              <div className="bg-blue-50 p-3 rounded-md mb-4 flex justify-between items-center">
                <span className="text-blue-700">
                  {selectedProfiles.length} user(s) selected
                </span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleBulkAction("toggle")}
                  >
                    Toggle Status
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleBulkAction("delete")}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={selectedProfiles.length === filteredProfiles.length && filteredProfiles.length > 0} 
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Bio</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProfiles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        <div className="flex flex-col items-center">
                          <AlertCircle className="h-12 w-12 text-gray-300 mb-2" />
                          <span>No users found matching your criteria</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedProfiles.map((profile) => (
                      <TableRow key={profile.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox 
                            checked={selectedProfiles.includes(profile.id)} 
                            onCheckedChange={() => handleSelectProfile(profile.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                              <Image 
                                src={profile.avatar || `/api/placeholder/32/32`} 
                                alt={profile.name} 
                                className="h-full w-full object-cover"
                                width={32}  
                                height={32}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{profile.name}</div>
                              <div className="text-xs text-gray-500">{profile.gender}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate">{profile.bio}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {profile.country}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={profile.status ? "default" : "destructive"}
                            className="capitalize cursor-pointer"
                            onClick={() => toggleStatus(profile.id)}
                          >
                            {profile.status ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600">
                            {formatDate(profile.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigateToEditUser(profile.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigateToEditUser(profile.id)}>
                                  Edit Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleStatus(profile.id)}>
                                  {profile.status ? "Deactivate" : "Activate"}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => {
                                    setUsersToDelete([profile.id]);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                >
                                  Delete Profile
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
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-gray-500">
                Showing {paginatedProfiles.length} of {filteredProfiles.length} entries
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button 
                    key={page}
                    variant={currentPage === page ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {usersToDelete.length} user profile{usersToDelete.length > 1 ? 's' : ''}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ProfilesPage;