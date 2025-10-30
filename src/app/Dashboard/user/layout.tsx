"use client";
import { UserProvider } from "@/lib/userContext";
import { ReactNode } from "react";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
