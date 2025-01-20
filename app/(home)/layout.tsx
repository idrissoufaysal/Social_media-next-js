// app/(home)/layout.tsx
import Bottombar from "@/components/shared/Bottombar";
import LeftBar from "@/components/shared/leftBar";
import Topbar from "@/components/shared/Topbar";
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { userId } = await auth()

  if (!userId) {
    return <div className="flex items-center justify-center ml-20">
      <SignIn />
    </div>
  }
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
