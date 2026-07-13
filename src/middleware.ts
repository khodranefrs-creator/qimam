import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["ar", "en"]
const defaultLocale = "ar"
const cookieName = "NEXT_LOCALE"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin auth
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next()
    const sessionToken = request.cookies.get("next-auth.session-token")?.value
      || request.cookies.get("__Secure-next-auth.session-token")?.value
    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // Skip API, static files, sitemap, robots
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  const firstSegment = pathname.split("/").filter(Boolean)[0]
  const isLocalePrefix = firstSegment === "ar" || firstSegment === "en"

  if (isLocalePrefix) {
    const locale = firstSegment
    const restPath = "/" + pathname.split("/").slice(2).join("/")

    requestHeaders.set("x-canonical-path", restPath || "/")

    const url = new URL(restPath || "/", request.url)
    url.search = request.nextUrl.search
    const response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    })
    response.cookies.set(cookieName, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    })
    return response
  }

  requestHeaders.set("x-canonical-path", pathname)

  const hasLocaleCookie = locales.some((l) => request.cookies.get(cookieName)?.value === l)
  if (!hasLocaleCookie) {
    const acceptLang = request.headers.get("accept-language") || ""
    const detectedLocale = acceptLang.startsWith("en") ? "en" : defaultLocale
    if (detectedLocale !== defaultLocale) {
      const response = NextResponse.next({ request: { headers: requestHeaders } })
      response.cookies.set(cookieName, detectedLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      })
      return response
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
