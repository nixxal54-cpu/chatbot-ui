import { i18nRouter } from "next-i18n-router";
import { NextResponse, type NextRequest } from "next/server";
import i18nConfig from "./i18nConfig";

export async function middleware(request: NextRequest) {
  const i18nResult = i18nRouter(request, i18nConfig);
  if (i18nResult) return i18nResult;

  const url = request.nextUrl.clone();

  // ✅ If user visits login page, skip it and go to /
  if (url.pathname === "/login") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // ✅ If user visits root page, go to a fake workspace/chat directly
  if (url.pathname === "/") {
    url.pathname = "/demo/chat"; // You can change "demo" to any default workspace name
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|auth).*)",
};
