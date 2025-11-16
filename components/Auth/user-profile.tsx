"use client"

import useClickOutside from "@/hooks/useClickOutside";
import { authClient } from "@/lib/auth/auth-client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  FaCalculator,
  FaCircleUser,
  FaDumbbell,
  FaGear,
  FaRightToBracket,
} from "react-icons/fa6";

const UserProfile = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { data: session } = authClient.useSession();

  const divRef = useRef(null);

  useClickOutside(divRef, () => setShowUserDropdown(false))

  return (
    <div
      ref={divRef}
      onClick={() => setShowUserDropdown(!showUserDropdown)}
      className="relative cursor-pointer"
    >
      {session?.user.image ? (
        <img
          src={session.user.image}
          alt="User profile image"
          className="rounded-full"
          width={35}
          height={36}
        />
      ) : (
        <FaCircleUser size={35} />
      )}
      <div
        className={`absolute top-[125%] bg-gray-200 shadow-lg right-0 p-3 rounded flex flex-col gap-1.5 transition-opacity duration-200 ease-in-out ${
          showUserDropdown
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Link href="/user/profile" className="flex items-center gap-2">
          <FaGear />
          <h1>My Profile</h1>
        </Link>
        <Link href="/user/train" className="flex items-center gap-2">
          <FaDumbbell />
          <h1>Train</h1>
        </Link>
        <Link href="/user/community" className="flex items-center gap-2">
          <FaCalculator />
          <h1>Community</h1>
        </Link>
        <div
          onClick={() => {
            if(!confirm("Are you sure you want to logout?")) return;
            authClient.signOut();
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <FaRightToBracket />
          <h1>Sign out</h1>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
