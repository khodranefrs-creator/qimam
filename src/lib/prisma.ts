import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.warn("DATABASE_URL is not set. Prisma queries will return empty results.")
    return null as unknown as PrismaClient
  }
  try {
    const pool = new Pool({ connectionString: url, connectionTimeoutMillis: 3000, max: 1 })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  } catch (e) {
    console.warn("Failed to create Prisma client:", e)
    return null as unknown as PrismaClient
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export async function safeQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    if (!prisma) return fallback
    return await query()
  } catch {
    console.warn("Database query failed, returning fallback data")
    return fallback
  }
}
