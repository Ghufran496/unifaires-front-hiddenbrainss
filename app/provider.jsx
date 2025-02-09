// provider.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "@/redux/provider";
export function Providers({ children }) {
  return (
    <>
      <ReduxProvider>
        <SessionProvider>{children} </SessionProvider>
      </ReduxProvider>
    </>
  );
}
