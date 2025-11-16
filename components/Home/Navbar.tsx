"use client";

import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/math-app-logo.png";
import Link from "next/link";
import {
  FaArrowLeft,
  FaBars,
  FaRightToBracket,
  FaCircleUser,
  FaGear,
  FaCalculator,
  FaDumbbell,
} from "react-icons/fa6";
import { authClient } from "@/lib/auth/auth-client";
import UserProfile from "../Auth/user-profile";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = authClient.useSession();

  const isNotLoggedIn = session == null;

  return (
    <div className="w-full flex justify-between items-center sticky top-0 p-2 pr-4 bg-white z-[100]">
      <div className="flex items-center gap-18">
        <Image src={Logo} alt="Math app logo image" height={90} />
        <div className="items-center justify-center gap-6 hidden md:flex">
          <Link href="/" className="text-xl font-medium">
            Home
          </Link>
          <Link href="/about-us" className="text-xl font-medium">
            About us
          </Link>
          <Link href="get-started" className="text-xl font-medium">
            Get started
          </Link>
        </div>
      </div>
      <div className="flex items-center sm:gap-6 gap-2 cursor-pointer">
        {isNotLoggedIn ? (
          <Link
            href="/auth/login"
            className="active:scale-95 transition-transform duration-100 ease-in-out flex items-center gap-2"
          >
            <FaRightToBracket size={32} />
            <span className="text-xl font-medium hidden md:block">Sign in</span>
          </Link>
        ) : (
          <UserProfile />
        )}
        <button
          onClick={() => setShowMenu(true)}
          className="cursor-pointer active:scale-95 transition-transform duration-100 ease-in-out md:hidden"
        >
          <FaBars size={32} />
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-white flex flex-col ${
          showMenu ? "" : "translate-x-full"
        } transition-transform duration-400 ease-in-out z-[100]`}
      >
        <button
          onClick={() => setShowMenu(false)}
          className="flex items-center gap-2 text-xl cursor-pointer font-medium p-4 border-b-2 border-gray-200"
        >
          <FaArrowLeft size={24} />
          Back
        </button>
        <Link
          href="/"
          className="text-xl font-medium  p-4 border-b-2 border-gray-200"
          onClick={() => setShowMenu(false)}
        >
          Home
        </Link>
        <Link
          href="/about-us"
          className="text-xl font-medium  p-4 border-b-2 border-gray-200"
          onClick={() => setShowMenu(false)}
        >
          About us
        </Link>
        <Link
          href="get-started"
          className="text-xl font-medium  p-4 border-b-2 border-gray-200"
          onClick={() => setShowMenu(false)}
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
