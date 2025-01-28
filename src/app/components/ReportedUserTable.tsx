// components/ReportedUserTable.tsx
import React from 'react';

interface ReportedUser {
  id: number;
  userId: number;
  name: string;
  message: string;
  gender: string;
  userType: string;
  requestedAt: string;
}

interface ReportedUserTableProps {
  users: ReportedUser[];
  onApprove: (userId: number) => void;
  onReject: (userId: number) => void;
}

const ReportedUserTable: React.FC<ReportedUserTableProps> = ({ users, onApprove, onReject }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reported Users</h2>
        <select className="border border-gray-300 rounded-md p-2">
          <option>Show 10 entries</option>
          <option>Show 25 entries</option>
          <option>Show 50 entries</option>
        </select>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">#</th>
            <th className="text-left p-2">USER ID</th>
            <th className="text-left p-2">NAME</th>
            <th className="text-left p-2">MESSAGE</th>
            <th className="text-left p-2">GENDER</th>
            <th className="text-left p-2">USER TYPE</th>
            <th className="text-left p-2">REQUESTED AT</th>
            <th className="text-left p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{user.userId}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.message}</td>
              <td className="p-2">{user.gender}</td>
              <td className="p-2">{user.userType}</td>
              <td className="p-2">{user.requestedAt}</td>
              <td className="p-2">
                <button
                  onClick={() => onApprove(user.userId)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => onReject(user.userId)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedUserTable;