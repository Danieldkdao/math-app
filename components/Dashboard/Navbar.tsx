import Image from "next/image";
import React from "react";
import Logo from "@/public/math-app-logo.png";
import UserProfile from "../Auth/user-profile";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-2 pr-4 border-b border-gray-400">
      <Link href="/">
        <Image
          src={Logo}
          alt="Figured out logo"
          height={70}
          className="cursor-pointer"
        />
      </Link>
      <UserProfile />
    </div>
  );
};

export default Navbar;
