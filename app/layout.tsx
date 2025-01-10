import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import CustomSessionProvider from "@/components/session/Session";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

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
  title: "Social media app",
  description: "Application web de reseau sociaux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <CustomSessionProvider>
            {children}
            <Toaster />
          </CustomSessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
