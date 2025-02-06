"use client";
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const users = [
  { id: 1, name: 'Guest', email: 'guest_1b40dae75ac29ac8_33@gmail.com', role: 'User', entry: '20/01/2025 12:48 PM', status: true },
  { id: 2, name: 'Guest', email: 'guest_251b76f0d36b4857_87@gmail.com', role: 'User', entry: '20/01/2025 12:41 PM', status: true },
  { id: 3, name: 'Guest', email: 'guest_6d896e956993aceb_19@gmail.com', role: 'User', entry: '20/01/2025 12:28 PM', status: true },
  { id: 4, name: 'Asad Mobi Tech', email: 'asadmobitech@gmail.com', role: 'Staff', entry: '20/01/2025 12:21 PM', status: true },
];

const UserPage = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-center">User Management</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Add New User</button>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
      </div>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Entry</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 whitespace-nowrap">{user.name}</td>
                <td className="border px-4 py-2 whitespace-nowrap">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.entry}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className={`px-2 py-1 rounded text-white ${user.status ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} transition`}
                  >
                    {user.status ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">View</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <button className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 transition">Previous</button>
        <button className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 transition">Next</button>
      </div>
    </DashboardLayout>
  );
};

export default UserPage;
