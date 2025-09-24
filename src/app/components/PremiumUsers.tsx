"use client";

import React from "react";

interface PremiumUser {
  id: number;
  name: string;
  email: string;
  subscriptionDate: string;
  plan: string;
}

interface PremiumUsersProps {
  users: PremiumUser[];
}

const PremiumUsers: React.FC<PremiumUsersProps> = ({ users }) => {
  return (
    <div className="mt-4">
      {/* Card container with responsive styling */}
      <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Subscription Date", "Plan"].map((header) => (
                <th key={header} className="text-left px-4 py-3 font-medium text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-gray-600">{user.subscriptionDate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${user.plan === "Premium" ? "bg-indigo-100 text-indigo-800" : 
                      user.plan === "Pro" ? "bg-green-100 text-green-800" : 
                      "bg-amber-100 text-amber-800"}`}>
                    {user.plan}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state with modern styling */}
      {users.length === 0 && (
        <div className="mt-6 text-center py-8 bg-gray-50 rounded-2xl">
          <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="mt-2 text-gray-500">No premium users found</p>
        </div>
      )}
    </div>
  );
};

export default PremiumUsers;