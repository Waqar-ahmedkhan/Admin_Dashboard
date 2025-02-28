"use client"
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

interface Transaction {
  id: number;
  name: string;
  planName: string;
  totalPaid: number;
  paymentId: string;
  paymentType: string;
  date: string;
  status: 'Approve' | 'Canceled' | 'Pending';
}

const PurchaseHistoryPage = () => {
  // Sample data with useState to enable modifications
  const [transactions, setTransactions] = useState<Transaction[]>([
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
  ]);

  const [cancelConfirm, setCancelConfirm] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Handle cancel action
  const handleCancel = (id: number) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id 
          ? { ...transaction, status: 'Canceled' } 
          : transaction
      )
    );
    setCancelConfirm(null);
  };

  // Filter transactions based on search term and status
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.planName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      transaction.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Purchase History</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="approve">Approved</option>
              <option value="canceled">Canceled</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.planName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">${transaction.totalPaid.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{transaction.paymentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.paymentType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'Approve'
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'Canceled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {transaction.status === 'Approve' ? (
                        cancelConfirm === transaction.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleCancel(transaction.id)}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors duration-150"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setCancelConfirm(null)}
                              className="px-3 py-1 bg-gray-200 text-gray-800 text-xs rounded hover:bg-gray-300 transition-colors duration-150"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCancelConfirm(transaction.id)}
                            className="px-3 py-1 bg-white border border-red-500 text-red-500 text-xs rounded hover:bg-red-50 transition-colors duration-150"
                          >
                            Cancel
                          </button>
                        )
                      ) : transaction.status === 'Canceled' ? (
                        <span className="text-gray-400 text-xs">Canceled</span>
                      ) : (
                        <span className="text-yellow-600 text-xs">Pending</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                    No transactions found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseHistoryPage;