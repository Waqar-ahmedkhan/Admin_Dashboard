"use client";

import { Copy, Check, ArrowRight } from "lucide-react";
import React, { useState } from "react";

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
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [key]: false }));
    }, 1000);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
        <button 
          className="text-blue-500 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors"
          aria-label="View all recent users"
        >
          View all <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Signup Date</th>
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
                      onClick={() => copyToClipboard(user.email, `email-${user.id}`)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                      aria-label={`Copy email for ${user.name}`}
                    >
                      {copied[`email-${user.id}`] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {user.signupDate}
                    <button
                      onClick={() => copyToClipboard(user.signupDate, `date-${user.id}`)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                      aria-label={`Copy signup date for ${user.name}`}
                    >
                      {copied[`date-${user.id}`] ? (
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

export default RecentUsers;