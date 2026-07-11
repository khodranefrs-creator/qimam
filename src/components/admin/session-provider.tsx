'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

export function AdminSessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
