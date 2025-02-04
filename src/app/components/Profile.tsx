// components/Profile.tsx
import Image from "next/image";
import React from "react";

interface ProfileProps {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  lastActive: string;
  onDelete?: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  role,
  avatarUrl,
  lastActive,
  onDelete,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-6 group">
      <div className="relative">
        <Image
          src={avatarUrl || "/default-avatar.png"} // Provide a fallback image
          alt={name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full border-4 border-purple-100"
        />
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-purple-600 font-medium">{role}</p>
            <p className="text-sm text-gray-600 mt-1">{email}</p>
          </div>
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-600 transition-opacity opacity-0 group-hover:opacity-100"
              aria-label={`Delete ${name}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Last active: {new Date(lastActive).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
