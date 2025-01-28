// pages/ProfilesPage.tsx
"use client"
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Profile from '../../components/Profile';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  lastActive: string;
}

const ProfilesPage: React.FC = () => {
  // Sample data for user profiles
  const userProfiles: UserProfile[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      avatarUrl: 'https://via.placeholder.com/150',
      lastActive: '2025-01-20',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      avatarUrl: 'https://via.placeholder.com/150',
      lastActive: '2025-01-19',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Moderator',
      avatarUrl: 'https://via.placeholder.com/150',
      lastActive: '2025-01-18',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob@example.com',
      role: 'User',
      avatarUrl: 'https://via.placeholder.com/150',
      lastActive: '2025-01-17',
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Profiles</h1>
      <div className="space-y-4">
        {userProfiles.map((profile) => (
          <Profile
            key={profile.id}
            id={profile.id}
            name={profile.name}
            email={profile.email}
            role={profile.role}
            avatarUrl={profile.avatarUrl}
            lastActive={profile.lastActive}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ProfilesPage;