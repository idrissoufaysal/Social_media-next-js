// app/(home)/layout.tsx
import Bottombar from "@/components/shared/Bottombar";
import LeftBar from "@/components/shared/leftBar";
import Topbar from "@/components/shared/Topbar";
import { SessionProvider } from "next-auth/react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:flex w-full h-screen">
      <Topbar />
      <LeftBar />
      <section className="flex flex-1 h-full">
        {children}
      </section>
      <Bottombar />
    </div>
  );
}
