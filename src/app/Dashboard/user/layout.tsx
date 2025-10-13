// File: app/users/layout.tsx (or adjust path based on your project structure, e.g., app/layout.tsx or dashboard/layout.tsx)
"use client";
import { UserProvider } from "@/lib/userContext"; // Adjust path to where UserContext.tsx is located
import { ReactNode } from "react";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
