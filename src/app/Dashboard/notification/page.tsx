"use client"
import React, { useState, ChangeEvent } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const NotificationPage = () => {
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); // Explicitly define the type as File | null
  const [type, setType] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission, e.g., send the notification
    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    if (image) {
      formData.append('image', image);
    }
    formData.append('type', type);

    console.log({ title, message, image, type });
    // Here you can add an API call to send the formData
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]); // Set the first selected file
    } else {
      setImage(null); // Reset to null if no file is selected
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Notification</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Image</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              onChange={handleFileChange} // Use the handler for file input
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <span className="ml-2 text-sm text-gray-500">
              {image ? image.name : 'No file chosen'}
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="alert">Alert</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default NotificationPage;