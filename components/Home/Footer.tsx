import Image from "next/image";
import React from "react";
import Logo from "@/public/math-app-logo.png";
import Facebook from "@/public/facebook_icon.png";
import GooglePlus from "@/public/googleplus_icon.png";
import Twitter from "@/public/twitter_icon.png";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-32 w-full">
      <div className="p-5 flex justify-between flex-col lg:flex-row gap-10 lg:gap-0">
        <div className="flex flex-col gap-2">
          <Image src={Logo} alt="Math app logo" height={70} />
          <p className="max-w-[550px] text-gray-500">
            Your destination for fun and educational math content for kids. We
            offer hundreds of unique problems, logic puzzles, and grade-specific
            challenges to make learning effective and enjoyable.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Company</h1>
          <Link href="/" className="text-gray-500">
            Home
          </Link>
          <Link href="/" className="text-gray-500">
            About us
          </Link>
          <Link href="/" className="text-gray-500">
            Get started
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">About</h1>
          <Link href="/" className="text-gray-500">
            Privacy policy
          </Link>
          <Link href="/" className="text-gray-500">
            Terms of service
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Socials</h1>
          <p className="text-gray-500">danieldkdao@gmail.com</p>
          <div className="flex items-center gap-1">
            <Link href="https://www.facebook.com/">
              <Image
                src={Facebook}
                alt="Facebook icon image"
                height={40}
                width={40}
              />
            </Link>
            <Link href="https://x.com/home">
              <Image
                src={Twitter}
                alt="Twitter icon image"
                height={40}
                width={40}
              />
            </Link>
            <Link href="https://workspaceupdates.googleblog.com/2023/04/new-community-features-for-google-chat-and-an-update-currents%20.html">
              <Image
                src={GooglePlus}
                alt="GooglePlus icon image"
                height={40}
                width={40}
              />
            </Link>
          </div>
        </div>
      </div>
      <hr className="text-gray-300" />
      <p className="text-sm text-gray-500 text-center py-4">
        Copyright 2025 - 2026 © Figured Out LLC. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
