"use client";
import React, { useState } from "react";

const AppSettings: React.FC = () => {
  const [appTitle, setAppTitle] = useState<string>("");
  const [appLogo, setAppLogo] = useState<File | null>(null);
  const [adminFavicon, setAdminFavicon] = useState<File | null>(null);

  const handleSave = () => {
    console.log({ appTitle, appLogo, adminFavicon });
    // Add API call to save settings
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">App Settings</h2>

      {/* App Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          App Title
        </label>
        <input
          type="text"
          value={appTitle}
          onChange={(e) => setAppTitle(e.target.value)}
          placeholder="Enter App Title"
          className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300"
        />
      </div>

      {/* App Logo */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          App Logo
        </label>
        <input
          type="file"
          onChange={(e) => setAppLogo(e.target.files?.[0] || null)}
          className="border rounded-lg p-2 w-full focus:ring focus:ring-indigo-300"
        />
      </div>

      {/* Admin Favicon */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Admin Favicon
        </label>
        <input
          type="file"
          onChange={(e) => setAdminFavicon(e.target.files?.[0] || null)}
          className="border rounded-lg p-2 w-full focus:ring focus:ring-indigo-300"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
      >
        Save
      </button>
    </div>
  );
};

export default AppSettings;