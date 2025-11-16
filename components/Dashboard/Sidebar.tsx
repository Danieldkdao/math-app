"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDumbbell, FaList, FaPeopleGroup, FaUser } from "react-icons/fa6";

const sidebarLinks = [
  {
    text: "My Profile",
    icon: <FaUser size={20} />,
    url: "/user/profile",
  },
  {
    text: "Dashboard",
    icon: <FaList size={20} />,
    url: "/user/dashboard",
  },
  {
    text: "Train",
    icon: <FaDumbbell size={20} />,
    url: "/user/train",
  },
  {
    text: "Community",
    icon: <FaPeopleGroup size={20} />,
    url: "/user/community",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sm:w-64 border-r border-gray-400 py-2">
      {sidebarLinks.map((item, index) => {
        const isMatch = item.url.split("/")[2] === pathname.split("/").at(-1);
        return (
          <Link href={item.url} key={index} className="w-full">
            <div
              className={`p-4 sm:px-6 ${
                isMatch && "bg-cyan-100 border-r-8 border-cyan-800"
              } flex items-center gap-4`}
            >
              {item.icon}
              <h1 className="font-medium hidden sm:block">{item.text}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
