import React from "react";

const AppSettings: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">App Settings</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          App Title
        </label>
        <input
          type="text"
          placeholder="Enter App Title"
          className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          App Logo
        </label>
        <input
          type="file"
          className="border rounded-lg p-2 w-full focus:ring focus:ring-indigo-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Admin Favicon
        </label>
        <input
          type="file"
          className="border rounded-lg p-2 w-full focus:ring focus:ring-indigo-300"
        />
      </div>

      <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
        Save
      </button>
    </div>
  );
};

export default AppSettings;
