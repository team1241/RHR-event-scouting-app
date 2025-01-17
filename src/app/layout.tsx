import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeProvider from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import Navbar from "~/components/navbar";

import "./globals.css";
import QueryProvider from "~/components/providers/query-provider";
import { extractRouterConfig } from "uploadthing/server";
import { uploadRouter } from "~/app/api/uploadthing/core";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | RHR Scouting",
    default: "RHR Scouting",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} font-sans antialiased bg-slate-950`}
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <main>
                <Navbar />
                <div className="relative py-2 px-5 md:py-2 md:px-10">
                  {children}
                </div>
              </main>
              <Toaster richColors position="top-right" />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
