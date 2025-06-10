import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/dashboard(.*)",
  "/scout(.*)",
  "/pits(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const newHeaders = new Headers();
  newHeaders.set("x-url", req.url);
  if (isProtectedRoute(req)) auth().protect();

  return NextResponse.next({ request: { headers: newHeaders } });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
