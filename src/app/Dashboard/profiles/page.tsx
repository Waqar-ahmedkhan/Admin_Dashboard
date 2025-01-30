// pages/ProfilesPage.tsx
"use client";
import React from "react";
import Image from "next/image";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  lastActive: string;
}

const userProfiles: UserProfile[] = [
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
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Moderator",
    avatarUrl:
      "https://img.freepik.com/premium-vector/man-avatar-drawing-vector_828267-1785.jpg?w=740",
    lastActive: "2025-01-18",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    role: "User",
    avatarUrl:
      "https://img.freepik.com/premium-vector/man-avatar-drawing-vector_828267-1785.jpg?w=740",
    lastActive: "2025-01-17",
  },
];

interface ProfileProps {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  lastActive: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  role,
  avatarUrl,
  lastActive,
}) => {
  return (
    <div
      className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      role="listitem"
    >
      <Image
        src={avatarUrl}
        alt={`${name}'s Avatar`}
        width={60} // Larger width for better UI
        height={60} // Larger height for better UI
        className="rounded-full border-2 border-gray-300"
      />
      <div className="ml-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="text-sm text-gray-500 font-medium">Role: {role}</p>
        <p className="text-sm text-gray-400">Last Active: {lastActive}</p>
      </div>
    </div>
  );
};

const ProfilesPage: React.FC = () => {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Profiles</h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {userProfiles.map((profile) => (
          <Profile
            key={profile.id}
            name={profile.name}
            email={profile.email}
            role={profile.role}
            avatarUrl={profile.avatarUrl}
            lastActive={profile.lastActive}
          />
        ))}
      </div>
    </main>
  );
};

export default ProfilesPage;
