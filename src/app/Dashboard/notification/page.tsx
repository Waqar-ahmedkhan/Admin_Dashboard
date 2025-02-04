"use client";
import React, { useState, ChangeEvent } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { FaImage, FaLink, FaPaperPlane, FaBell } from "react-icons/fa";
import Image from "next/image";

const NotificationPage = () => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [type, setType] = useState<string>("");
  const [externalLink, setExternalLink] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    if (image) {
      formData.append("image", image);
    }
    formData.append("type", type);
    if (externalLink) {
      formData.append("externalLink", externalLink);
    }

    console.log({ title, message, image, type, externalLink });
    // API call can be added here to send the formData
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-600">
          <FaBell className="text-blue-500" /> Send Notification
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter notification title"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Write your message here..."
              required
            />
          </div>

          {/* File Upload */}
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 items-center gap-2">
              <FaImage className="text-blue-500" /> Upload Image (Optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {imagePreview && (
              <div className="mt-3">
                <Image src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-md shadow-md" />
              </div>
            )}
          </div>

          {/* Notification Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Type</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="alert">Alert</option>
            </select>
          </div>

          {/* External Link Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 items-center gap-2">
              <FaLink className="text-blue-500" /> External Link (Optional)
            </label>
            <input
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              placeholder="https://example.com"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              <FaPaperPlane /> Send Notification
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NotificationPage;
