import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import Navbar from "~/components/navbar";

import "./globals.css";
import QueryProvider from "~/components/providers/query-provider";

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
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <main>
                <Navbar />
                <div className="relative py-3 px-5 md:py-6 md:px-10">
                  {children}
                </div>
              </main>
              <Toaster richColors position="top-right" />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
