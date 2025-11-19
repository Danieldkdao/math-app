import Sidebar from "@/components/Dashboard/Sidebar";
import Navbar from "@/components/Dashboard/Navbar";
import { ReactNode } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import NotSignedIn from "@/components/Auth/not-signed-in";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return redirect("/");
  
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">{session == null ? <NotSignedIn /> : children}</div>
      </main>
    </div>
  );
};

export default HomeLayout;
