"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ui/toaster";
import dynamic from "next/dynamic";

const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <div className="theme-provider">{children}</div>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <ThemeProvider>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </ThemeProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
