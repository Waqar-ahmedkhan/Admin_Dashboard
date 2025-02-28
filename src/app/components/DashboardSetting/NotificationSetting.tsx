"use client";
import React, { useState } from "react";
import { Check, Copy, Eye, EyeOff, Bell, BellOff } from "lucide-react";

const NotificationSettings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [appIdVisible, setAppIdVisible] = useState(false);
  const [restKeyVisible, setRestKeyVisible] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const oneSignalAppId = "72e84c8f-ac36-41e9-a353-2c8b759a3c6f";
  const oneSignalRestKey = "YTg1NzM2YTctYzJmMS000DqjLTgxYTEMzHIN210MWF";

  const handleSave = () => {
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          {notificationsEnabled ? (
            <Bell className="w-7 h-7" />
          ) : (
            <BellOff className="w-7 h-7" />
          )}
          Notification Settings
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Enable Notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-800">Enable Notifications</h3>
            <p className="text-sm text-gray-500">Toggle global notification settings</p>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`relative rounded-full w-12 h-6 transition-colors duration-300 ${
              notificationsEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transform transition-transform duration-300 ${
                notificationsEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* OneSignal Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            OneSignal Integration
          </h3>

          {/* App ID Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">App ID</label>
            <div className="flex items-center gap-2">
              <input
                type={appIdVisible ? "text" : "password"}
                value={oneSignalAppId}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => setAppIdVisible(!appIdVisible)}
                className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
              >
                {appIdVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <button
                onClick={() => copyToClipboard(oneSignalAppId)}
                className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          {/* REST Key Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">REST Key</label>
            <div className="flex items-center gap-2">
              <input
                type={restKeyVisible ? "text" : "password"}
                value={oneSignalRestKey}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => setRestKeyVisible(!restKeyVisible)}
                className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
              >
                {restKeyVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <button
                onClick={() => copyToClipboard(oneSignalRestKey)}
                className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button with Feedback */}
        <div className="relative">
          <button
            onClick={handleSave}
            className="w-full   text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02]"
          >
            Save Changes
          </button>
          {showFeedback && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
              <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-fade-in-up">
                <Check size={16} />
                Settings saved successfully!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;