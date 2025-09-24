"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";

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
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-xl font-bold text-gray-800">Recently Contacted Users</h2>
        <button 
          className="text-blue-500 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors"
          aria-label="View all contacted users"
        >
          View all <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Contacted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr 
                key={user.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4 text-sm text-gray-700 font-medium">
                  {user.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {user.email}
                    <button
                      onClick={() => copyToClipboard(user.email)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                      aria-label={`Copy ${user.email}`}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {user.lastContacted}
                    <button
                      onClick={() => copyToClipboard(user.lastContacted)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                      aria-label={`Copy ${user.lastContacted}`}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentlyContactedUsers;