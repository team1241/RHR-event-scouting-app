import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import Navbar from "~/components/navbar";

import "./globals.css";

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
          <ThemeProvider attribute="class" defaultTheme="dark">
            <main>
              <Navbar />
              <div className="relative flex flex-col gap-6 p-6">{children}</div>
            </main>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
