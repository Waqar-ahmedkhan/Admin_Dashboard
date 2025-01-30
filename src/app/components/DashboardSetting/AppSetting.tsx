import React from 'react';

const AppSettings: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">App Settings</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">App Title</label>
        <input
          type="text"
          placeholder="Enter App Title"
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">App Logo</label>
        <input type="file" className="border rounded p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Admin Favicon</label>
        <input type="file" className="border rounded p-2 w-full" />
      </div>
      <button className="bg-blue-600 text-white py-2 px-4 rounded">
        Save
      </button>
    </div>
  );
};

export default AppSettings;
