import { i18nRouter } from "next-i18n-router";
import { NextResponse, type NextRequest } from "next/server";
import i18nConfig from "./i18nConfig";

// 🧩 Middleware that bypasses login and lets everyone access the chatbot
export async function middleware(request: NextRequest) {
  // Keep i18n (language) working
  const i18nResult = i18nRouter(request, i18nConfig);
  if (i18nResult) return i18nResult;

  // 🚀 Skip Supabase login check completely
  const url = request.nextUrl.clone();

  // Optional: If user tries to open /login, redirect them to the home/chat page
  if (url.pathname === "/login") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Allow everyone to access all routes freely
  return NextResponse.next();
}

// Keep matcher (this decides which routes use middleware)
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|auth).*)"
};
