// components/Profile.tsx
import Image from 'next/image';
import React from 'react';

interface ProfileProps {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  lastActive: string;
}

const Profile: React.FC<ProfileProps> = ({name, email, role, avatarUrl, lastActive }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      <Image src={avatarUrl} alt={name} className="w-12 h-12 rounded-full" />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="text-sm text-gray-600">Role: {role}</p>
        <p className="text-sm text-gray-600">Last Active: {lastActive}</p>
      </div>
    </div>
  );
};

export default Profile;