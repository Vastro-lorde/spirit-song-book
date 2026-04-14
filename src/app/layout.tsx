import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import NavigationProgress from "@/components/NavigationProgress";
import OfflineIndicator from "@/components/OfflineIndicator";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spirit Song Book",
  description:
    "Access your favourite hymn books — search, read, and share hymns anytime, anywhere.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Spirit Song Book" },
};

export const viewport: Viewport = {
  themeColor: "#2e3192",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <Header />
        {children}
        <OfflineIndicator />
      </body>
    </html>
  );
}
