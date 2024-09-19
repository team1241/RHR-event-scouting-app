import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ClerkProvider,
  // SignedIn,
  // SignedOut,
  // SignInButton,
  // SignUpButton,
  // SignOutButton,
} from "@clerk/nextjs";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RHR Scouting App",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>
            {/* <SignedOut>
              <SignInButton mode="modal" />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <SignOutButton />
            </SignedIn> */}
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
