"use client";
import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout"; // Adjust the path if needed
import Profile from "../../components/Profile";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  lastActive: string;
}

const ProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      avatarUrl:
        "https://img.freepik.com/premium-vector/man-avatar-drawing-vector_828267-1785.jpg?w=740",
      lastActive: "2025-01-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      avatarUrl:
        "https://img.freepik.com/premium-vector/man-avatar-drawing-vector_828267-1785.jpg?w=740",
      lastActive: "2025-01-19",
    },
  ]);

  const [isAdmin] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: "",
    email: "",
    role: "User",
    avatarUrl:
      "https://img.freepik.com/premium-vector/man-avatar-drawing-vector_828267-1785.jpg?w=740",
    lastActive: new Date().toISOString().split("T")[0],
  });

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      ...newProfile,
      id: profiles.length + 1,
    };
    setProfiles([...profiles, profile]);
    setShowAddForm(false);
    setNewProfile({
      name: "",
      email: "",
      role: "User",
      avatarUrl:
        "https://img.freepik.com/premium-vector/man-avatar-drawing-vector_828267-1785.jpg?w=740",
      lastActive: new Date().toISOString().split("T")[0],
    });
  };

  const handleDeleteProfile = (id: number) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  return (
    <DashboardLayout>
      <main className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">User Profiles</h1>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Profile
              </button>
            )}
          </div>

          {showAddForm && (
            <form
              onSubmit={handleAddProfile}
              className="bg-white p-6 rounded-xl shadow-md mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={newProfile.name}
                    onChange={(e) =>
                      setNewProfile({ ...newProfile, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={newProfile.email}
                    onChange={(e) =>
                      setNewProfile({ ...newProfile, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={newProfile.role}
                    onChange={(e) =>
                      setNewProfile({ ...newProfile, role: e.target.value })
                    }
                  >
                    <option>User</option>
                    <option>Admin</option>
                    <option>Moderator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Active
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={newProfile.lastActive}
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        lastActive: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add Profile
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {profiles.map((profile) => (
              <Profile
                key={profile.id}
                {...profile}
                onDelete={isAdmin ? () => handleDeleteProfile(profile.id) : undefined}
              />
            ))}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ProfilesPage;
