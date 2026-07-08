import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.warn("DATABASE_URL is not set. Prisma queries will return empty results.")
    return null as unknown as PrismaClient
  }
  try {
    const adapter = new PrismaPg(url)
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
  } catch (e: any) {
    if (e?.code === 'ECONNREFUSED' || e?.message?.includes('ECONNREFUSED')) {
      console.warn("Database not available, returning fallback data")
      return fallback
    }
    throw e
  }
}
