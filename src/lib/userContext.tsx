"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the User type
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  entry: string;
  status: boolean;
}

// Initial Users List (cleaned up duplicates, made IDs consecutive)
const initialUsers: User[] = [
  {
    id: 1,
    name: "Guest",
    email: "guest_1b40dae75ac29ac8_33@gmail.com",
    role: "User",
    entry: "20/01/2025 12:48 PM",
    status: true,
  },
  {
    id: 2,
    name: "Guest",
    email: "guest_251b76f0d36b4857_87@gmail.com",
    role: "User",
    entry: "20/01/2025 12:41 PM",
    status: true,
  },
  {
    id: 3,
    name: "Guest",
    email: "guest_6d896e956993aceb_19@gmail.com",
    role: "User",
    entry: "20/01/2025 12:28 PM",
    status: true,
  },
  {
    id: 4,
    name: "Asad Mobi Tech",
    email: "asadmobitech@gmail.com",
    role: "Staff",
    entry: "20/01/2025 12:21 PM",
    status: true,
  },

  {
    id: 5,
    name: "Guest",
    email: "guest_6d896e956993aceb_19@gmail.com",
    role: "User",
    entry: "20/01/2025 12:28 PM",
    status: true,
  },
  {
    id: 6,
    name: "Asad Mobi Tech",
    email: "asadmobitech@gmail.com",
    role: "Staff",
    entry: "20/01/2025 12:21 PM",
    status: true,
  },
  {
    id: 7,
    name: "Guest",
    email: "guest_6d896e956993aceb_19@gmail.com",
    role: "User",
    entry: "20/01/2025 12:28 PM",
    status: true,
  },
  {
    id: 8,
    name: "Asad Mobi Tech",
    email: "asadmobitech@gmail.com",
    role: "Staff",
    entry: "20/01/2025 12:21 PM",
    status: true,
  },
  {
    id: 9,
    name: "Guest",
    email: "guest_6d896e956993aceb_19@gmail.com",
    role: "User",
    entry: "20/01/2025 12:28 PM",
    status: true,
  },
  {
    id: 10,
    name: "Asad Mobi Tech",
    email: "asadmobitech@gmail.com",
    role: "Staff",
    entry: "20/01/2025 12:21 PM",
    status: true,
  },
];

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

// File: app/users/page.tsx (or pages/users/index.tsx) - User List Page
