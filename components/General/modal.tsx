"use client";

import { useModal } from "@/hooks/useModal";
import { ReactNode, useRef } from "react";

type ModalPropsType = {
  children: ReactNode;
  disable?: boolean;
  callback?: () => void;
};

const Modal = ({ children, disable, callback }: ModalPropsType) => {
  const { isModalOpen, setIsModalOpen } = useModal();

  const clickOutsideFunc = () => {
    if(disable) return;
    setIsModalOpen(false);
    if (callback) callback();
  };

  return (
    <div
      className={`fixed inset-0 opacity-0 ${
        isModalOpen ? "opacity-100" : "pointer-events-none"
      } transition-opacity duration-300 ease-in-out`}
    >
      <div
        className="fixed inset-0 bg-black opacity-40"
      ></div>
      <div className="flex items-center justify-center fixed inset-0">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
