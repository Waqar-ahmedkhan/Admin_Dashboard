"use client";
import React, { useState } from "react";

const TermsAndConditionsSettings: React.FC = () => {
  const [termsAndConditions, setTermsAndConditions] = useState<string>("");

  const handleSave = () => {
    console.log("Terms & Conditions Updated:", termsAndConditions);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Terms & Conditions</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Terms & Conditions
        </label>
        <textarea
          value={termsAndConditions}
          onChange={(e) => setTermsAndConditions(e.target.value)}
          className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300"
          rows={8}
          placeholder="Enter terms & conditions text..."
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

export default TermsAndConditionsSettings;