"use client";
import React from "react";

interface ContactedUser {
  id: number;
  name: string;
  email: string;
  lastContacted: string;
}

interface RecentlyContactedUsersProps {
  users: ContactedUser[];
}

const RecentlyContactedUsers: React.FC<RecentlyContactedUsersProps> = ({ users }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Contacted Users</h2>
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">Email</th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">Last Contacted</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-sm text-gray-700">{user.name}</td>
                <td className="p-4 text-sm text-gray-700">{user.email}</td>
                <td className="p-4 text-sm text-gray-700">{user.lastContacted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentlyContactedUsers;