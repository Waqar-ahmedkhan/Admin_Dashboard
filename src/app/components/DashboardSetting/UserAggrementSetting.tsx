"use client";
import React, { useState } from "react";

const UserAgreementSettings: React.FC = () => {
  const [userAgreement, setUserAgreement] = useState<string>("");

  const handleSave = () => {
    console.log("User Agreement Updated:", userAgreement);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">User Agreement</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          User Agreement
        </label>
        <textarea
          value={userAgreement}
          onChange={(e) => setUserAgreement(e.target.value)}
          className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300"
          rows={8}
          placeholder="Enter user agreement text..."
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

export default UserAgreementSettings;