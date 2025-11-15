import Footer from "@/components/Dashboard/Footer";
import Navbar from "@/components/Dashboard/Navbar";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="flex flex-col items-center justify-center w-full">
        <div className="w-[95%] md:w-[90%] lg:w-[85%]">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
