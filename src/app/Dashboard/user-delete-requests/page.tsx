"use client"
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

interface DeleteRequest {
  id: number;
  name: string;
  email: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason?: string;
}

const UserDeleteRequestsPage = () => {
  // State for delete requests with useState to enable modifications
  const [deleteRequests, setDeleteRequests] = useState<DeleteRequest[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      requestDate: '2024-01-15',
      status: 'Pending',
      reason: 'No longer using the service'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      requestDate: '2024-01-10',
      status: 'Pending',
      reason: 'Privacy concerns'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      requestDate: '2024-01-05',
      status: 'Pending',
      reason: 'Creating a new account'
    },
    {
      id: 4,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      requestDate: '2024-01-05',
      status: 'Pending',
      reason: 'Creating a new account'
    },{
      id: 5,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      requestDate: '2024-01-05',
      status: 'Pending',
      reason: 'Creating a new account'
    },{
      id: 6,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      requestDate: '2024-01-05',
      status: 'Pending',
      reason: 'Creating a new account'
    },{
      id: 7,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      requestDate: '2024-01-05',
      status: 'Pending',
      reason: 'Creating a new account'
    },{
      id: 8,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      requestDate: '2024-01-05',
      status: 'Pending',
      reason: 'Creating a new account'
    },
  ]);

  // State for action confirmation
  const [confirmAction, setConfirmAction] = useState<{id: number, action: 'approve' | 'reject'} | null>(null);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // State for expanded view
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Handle approve action
  const handleApprove = (id: number) => {
    setDeleteRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: 'Approved' } 
          : request
      )
    );
    setConfirmAction(null);
  };

  // Handle reject action
  const handleReject = (id: number) => {
    setDeleteRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: 'Rejected' } 
          : request
      )
    );
    setConfirmAction(null);
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Filter requests based on search term and status
  const filteredRequests = deleteRequests.filter(request => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.reason && request.reason.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'all' || 
      request.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Toggle expanded view
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">User Delete Requests</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 14h.01M12 16h.01M12 18h.01M12 20h.01M12 22h.01"></path>
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No delete requests match your current filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request, index) => (
                  <React.Fragment key={request.id}>
                    <tr className={`hover:bg-gray-50 transition-colors duration-150 ${expandedId === request.id ? 'bg-gray-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{request.name}</div>
                          <div className="text-sm text-gray-500">{request.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(request.requestDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            request.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : request.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {request.status === 'Pending' ? (
                          confirmAction && confirmAction.id === request.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => 
                                  confirmAction.action === 'approve' 
                                    ? handleApprove(request.id) 
                                    : handleReject(request.id)
                                }
                                className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors duration-150"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmAction(null)}
                                className="px-3 py-1 bg-gray-200 text-gray-800 text-xs rounded hover:bg-gray-300 transition-colors duration-150"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setConfirmAction({id: request.id, action: 'approve'})}
                                className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors duration-150"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => setConfirmAction({id: request.id, action: 'reject'})}
                                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors duration-150"
                              >
                                Reject
                              </button>
                            </div>
                          )
                        ) : (
                          <span className="text-gray-500 text-xs">
                            {request.status === 'Approved' ? 'Approved' : 'Rejected'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => toggleExpand(request.id)}
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                        >
                          {expandedId === request.id ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                    {expandedId === request.id && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50 border-b">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900 mb-2">Deletion Reason:</div>
                            <p className="text-gray-600">{request.reason || 'No reason provided'}</p>
                            <div className="mt-4 flex justify-end">
                              {request.status === 'Pending' && (
                                <div className="flex space-x-3">
                                  <button
                                    onClick={() => setConfirmAction({id: request.id, action: 'approve'})}
                                    className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-150"
                                  >
                                    Approve Request
                                  </button>
                                  <button
                                    onClick={() => setConfirmAction({id: request.id, action: 'reject'})}
                                    className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-150"
                                  >
                                    Reject Request
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div>
            Showing {filteredRequests.length} of {deleteRequests.length} requests
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

export default UserDeleteRequestsPage;