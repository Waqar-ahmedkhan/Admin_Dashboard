// components/RecentUsers.tsx
import React from 'react';

interface RecentUser {
  id: number;
  name: string;
  email: string;
  signupDate: string;
}

interface RecentUsersProps {
  users: RecentUser[];
}

const RecentUsers: React.FC<RecentUsersProps> = ({ users }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Recent Users</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Signup Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.signupDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;