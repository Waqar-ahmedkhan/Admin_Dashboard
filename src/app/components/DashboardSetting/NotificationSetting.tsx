"use client";
import React, { useState } from "react";

const NotificationSettings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);

  const handleSave = () => {
    console.log("Notifications Enabled:", notificationsEnabled);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
        </label>
      </div>
      <button
        onClick={handleSave}
        className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
      >
        Save
      </button>
    </div>
  );
};

export default NotificationSettings;