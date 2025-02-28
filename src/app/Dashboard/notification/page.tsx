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
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 rounded-full">
            <FaBell className="text-blue-600 text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Send Notification</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter notification title"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Write your message here..."
              required
            />
          </div>

          {/* File Upload */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <FaImage className="text-blue-600" />
              <label className="text-sm font-medium text-gray-700">Upload Image (Optional)</label>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={200}
                  height={150}
                  className="w-full h-40 object-cover rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Notification Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
            <div className="flex items-center gap-2 mb-2">
              <FaLink className="text-blue-600" />
              <label className="text-sm font-medium text-gray-700">External Link (Optional)</label>
            </div>
            <input
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-transparent rounded-lg text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
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