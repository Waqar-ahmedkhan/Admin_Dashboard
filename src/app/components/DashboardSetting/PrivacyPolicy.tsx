"use client";
import React, { useState } from "react";

const PrivacyPolicySettings: React.FC = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState<string>("");

  const handleSave = () => {
    console.log("Privacy Policy Updated:", privacyPolicy);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy Policy</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Privacy Policy
        </label>
        <textarea
          value={privacyPolicy}
          onChange={(e) => setPrivacyPolicy(e.target.value)}
          className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300"
          rows={8}
          placeholder="Enter privacy policy text..."
        />
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

export default PrivacyPolicySettings;