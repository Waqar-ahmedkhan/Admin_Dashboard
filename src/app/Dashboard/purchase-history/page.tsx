"use client"
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const PurchaseHistoryPage = () => {
  // Sample data for purchase history
  const transactions = [
    {
      id: 1,
      name: 'h999',
      planName: 'Monthly plan',
      totalPaid: 666,
      paymentId: 'asawspw1111',
      paymentType: 'in-app',
      date: '22 Dec, 24',
      status: 'Approve',
    },
    {
      id: 2,
      name: 'Shahid',
      planName: 'Monthly plan',
      totalPaid: 666,
      paymentId: 'asawspw1111',
      paymentType: 'in-app',
      date: '18 Dec, 24',
      status: 'Approve',
    },
    {
      id: 3,
      name: 'Guest',
      planName: 'Monthly plan',
      totalPaid: 666,
      paymentId: 'asawspw1111',
      paymentType: 'in-app',
      date: '06 Nov, 24',
      status: 'Approve',
    },
    {
      id: 4,
      name: 'dem',
      planName: 'Monthly plan',
      totalPaid: 655,
      paymentId: 'abc123',
      paymentType: 'in-app',
      date: '12 Sep, 24',
      status: 'Canceled',
    },
    {
      id: 5,
      name: 'Jectu Bhaiya',
      planName: 'abc',
      totalPaid: 132,
      paymentId: 'abc.123',
      paymentType: 'in-app',
      date: '26 Sep, 24',
      status: 'Approve',
    },
    {
      id: 6,
      name: 'Shahid',
      planName: 'Monthly plan',
      totalPaid: 666,
      paymentId: 'asawspw1111',
      paymentType: 'in-app',
      date: '24 Sep, 24',
      status: 'Approve',
    },
  ];

  // Handle cancel action
  const handleCancel = (id: number) => {
    console.log(`Cancel transaction with ID: ${id}`);
    // Add your cancel logic here, e.g., API call
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Purchase History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">NAME</th>
              <th className="py-2 px-4 border-b">PLAN NAME</th>
              <th className="py-2 px-4 border-b">TOTAL PAID</th>
              <th className="py-2 px-4 border-b">PAYMENT ID</th>
              <th className="py-2 px-4 border-b">PAYMENT TYPE</th>
              <th className="py-2 px-4 border-b">DATE</th>
              <th className="py-2 px-4 border-b">STATUS</th>
              <th className="py-2 px-4 border-b">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{transaction.name}</td>
                <td className="py-2 px-4 border-b">{transaction.planName}</td>
                <td className="py-2 px-4 border-b">${transaction.totalPaid}</td>
                <td className="py-2 px-4 border-b">{transaction.paymentId}</td>
                <td className="py-2 px-4 border-b">{transaction.paymentType}</td>
                <td className="py-2 px-4 border-b">{transaction.date}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      transaction.status === 'Approve'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.status === 'Approve' && (
                    <button
                      onClick={() => handleCancel(transaction.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseHistoryPage;