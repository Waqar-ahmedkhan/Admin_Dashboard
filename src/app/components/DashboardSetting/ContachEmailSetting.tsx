"use client";
import React, { useState } from "react";

const ContactEmailSettings: React.FC = () => {
  const [contactEmail, setContactEmail] = useState<string>("apps.smartdeveloper@gmail.com");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = () => {
    console.log("Contact Email Updated:", contactEmail);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Email</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Email
        </label>
        {isEditing ? (
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300"
            placeholder="Enter contact email"
          />
        ) : (
          <p className="text-gray-600">{contactEmail}</p>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactEmailSettings;