"use client"
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const UserDeleteRequestsPage = () => {
  // Sample data for user delete requests
  const deleteRequests = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      requestDate: '2024-01-15',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      requestDate: '2024-01-10',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      requestDate: '2024-01-05',
      status: 'Pending',
    },
  ];

  // Handle approve action
  const handleApprove = (id: number) => {
    console.log(`Approve delete request with ID: ${id}`);
    // Add your approve logic here, e.g., API call
  };

  // Handle reject action
  const handleReject = (id: number) => {
    console.log(`Reject delete request with ID: ${id}`);
    // Add your reject logic here, e.g., API call
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">User Delete Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">NAME</th>
              <th className="py-2 px-4 border-b">EMAIL</th>
              <th className="py-2 px-4 border-b">REQUEST DATE</th>
              <th className="py-2 px-4 border-b">STATUS</th>
              <th className="py-2 px-4 border-b">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {deleteRequests.map((request, index) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{request.name}</td>
                <td className="py-2 px-4 border-b">{request.email}</td>
                <td className="py-2 px-4 border-b">{request.requestDate}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      request.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="text-green-500 hover:text-green-700 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default UserDeleteRequestsPage;