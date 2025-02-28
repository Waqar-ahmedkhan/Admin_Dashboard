"use client";
import React, { useState } from "react";

const AppUpdatePopupSettings: React.FC = () => {
  const [isPopupEnabled, setIsPopupEnabled] = useState<boolean>(true);
  const [updateMessage, setUpdateMessage] = useState<string>("");
  const [appStoreLink, setAppStoreLink] = useState<string>("");

  const handleSave = () => {
    console.log("App Update Popup Settings Updated:", {
      isPopupEnabled,
      updateMessage,
      appStoreLink,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">App Update Popup</h2>

      {/* Enable/Disable Popup */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPopupEnabled}
            onChange={(e) => setIsPopupEnabled(e.target.checked)}
            className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">Enable App Update Popup</span>
        </label>
      </div>

      {/* Update Message */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Update Message
        </label>
        <textarea
          value={updateMessage}
          onChange={(e) => setUpdateMessage(e.target.value)}
          className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300"
          rows={4}
          placeholder="Enter update message..."
        />
      </div>

      {/* App Store Link */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          App Store Link
        </label>
        <input
          type="url"
          value={appStoreLink}
          onChange={(e) => setAppStoreLink(e.target.value)}
          className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300"
          placeholder="https://play.google.com/store/apps/"
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

export default AppUpdatePopupSettings;