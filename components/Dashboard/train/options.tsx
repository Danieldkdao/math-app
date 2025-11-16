"use client";

import { useModal } from "@/hooks/useModal";
import { useEffect } from "react";
import { FaHistory } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import SettingsModal from "./settings-modal";

const Options = () => {
  const { setIsModalOpen } = useModal();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-xl font-medium">Train</h1>
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer p-2 rounded-md hover:bg-gray-200"
        >
          <FaGear />
        </button>
        <button className="cursor-pointer p-2 rounded-md hover:bg-gray-200">
          <FaHistory />
        </button>
        <SettingsModal />
      </div>
    </div>
  );
};

export default Options;
