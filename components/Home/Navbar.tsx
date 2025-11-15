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

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return <div className="text-4xl font-bold text-center">Loading...</div>;
  }

  const isNotLoggedIn = session == null;

  return (
    <div className="w-full flex justify-between items-center sticky top-0 p-2 pr-4 bg-white z-[10000]">
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
          <div
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="relative"
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="User profile image"
                className="size-12 rounded-full aspect-[1/1]"
              />
            ) : (
              <FaCircleUser size={50} />
            )}
            <div
              className={`absolute top-[125%] bg-gray-200 shadow-lg right-0 p-3 rounded flex flex-col gap-1.5 transition-opacity duration-200 ease-in-out ${
                showUserDropdown
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <Link href="/profile" className="flex items-center gap-2">
                <FaGear />
                <h1>My Profile</h1>
              </Link>
              <Link href="/train" className="flex items-center gap-2">
                <FaDumbbell />
                <h1>Train</h1>
              </Link>
              <Link href="/community" className="flex items-center gap-2">
                <FaCalculator />
                <h1>Community</h1>
              </Link>
              <div
                onClick={() => authClient.signOut()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaRightToBracket />
                <h1>Sign out</h1>
              </div>
            </div>
          </div>
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
