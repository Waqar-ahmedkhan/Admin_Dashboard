import React from "react";

const NotificationSettings: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
      <p className="text-gray-600 mb-4">Customize your notification preferences.</p>

      <div className="flex items-center mb-4">
        <input type="checkbox" id="emailAlerts" className="mr-2" />
        <label htmlFor="emailAlerts" className="text-gray-700">Enable Email Alerts</label>
      </div>

      <div className="flex items-center mb-4">
        <input type="checkbox" id="smsAlerts" className="mr-2" />
        <label htmlFor="smsAlerts" className="text-gray-700">Enable SMS Alerts</label>
      </div>

      <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
        Save Changes
      </button>
    </div>
  );
};

export default NotificationSettings;
