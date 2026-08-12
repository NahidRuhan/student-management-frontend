import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { TopNav } from "@/components/layout/TopNav";

export const metadata: Metadata = {
  title: "EduAyna - Student Management Dashboard",
  description: "A modern student management dashboard for EduAyna.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-alt">
        <StoreProvider>
          <AuthWrapper>
            <TopNav />
            {children}
          </AuthWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
