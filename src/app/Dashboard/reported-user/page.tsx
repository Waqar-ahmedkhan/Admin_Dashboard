// pages/ReportedUserPage.tsx
"use client"
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import ReportedUserTable from '../../components/ReportedUserTable';

interface ReportedUser {
  id: number;
  userId: number;
  name: string;
  message: string;
  gender: string;
  userType: string;
  requestedAt: string;
}

const ReportedUserPage: React.FC = () => {
  // Sample data for reported users
  const [reportedUsers, setReportedUsers] = React.useState<ReportedUser[]>([
    {
      id: 1,
      userId: 20,
      name: '',
      message: 'False gender',
      gender: '',
      userType: 'custom',
      requestedAt: '2024-12-19 17:35:03',
    },
    {
      id: 2,
      userId: 18,
      name: '',
      message: 'False gender',
      gender: '',
      userType: 'custom',
      requestedAt: '2024-12-19 17:36:50',
    },
    {
      id: 3,
      userId: 19,
      name: '',
      message: 'False gender',
      gender: '',
      userType: 'custom',
      requestedAt: '2024-12-19 20:37:08',
    },
    {
      id: 4,
      userId: 18,
      name: '',
      message: 'Fraud',
      gender: '',
      userType: 'custom',
      requestedAt: '2024-12-19 21:04:35',
    },
    {
      id: 5,
      userId: 13,
      name: '',
      message: 'Fraud',
      gender: '',
      userType: 'livestream',
      requestedAt: '2024-12-19 21:30:26',
    },
    {
      id: 6,
      userId: 39,
      name: '',
      message: 'Hate Speech',
      gender: 'Female',
      userType: 'custom',
      requestedAt: '2024-12-23 11:48:47',
    },
  ]);

  // Handle Approve action
  const handleApprove = (userId: number) => {
    alert(`Approved user with ID: ${userId}`);
    // You can update the state or make an API call here
    setReportedUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
  };

  // Handle Reject action
  const handleReject = (userId: number) => {
    alert(`Rejected user with ID: ${userId}`);
    // You can update the state or make an API call here
    setReportedUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Reported User</h1>
      <ReportedUserTable
        users={reportedUsers}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </DashboardLayout>
  );
};

export default ReportedUserPage;