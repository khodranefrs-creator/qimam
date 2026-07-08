import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function getAdminSession() {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")
  return session
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function successResponse(data: any, status = 200) {
  return NextResponse.json(data, { status })
}
