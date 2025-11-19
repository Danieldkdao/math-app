"use client";

import { useModal } from "@/hooks/useModal";
import { ReactNode, useEffect, useRef } from "react";

type ModalPropsType = {
  children: ReactNode;
  disable?: boolean;
  callback?: () => void;
};

const Modal = ({ children, disable, callback }: ModalPropsType) => {
  const { isModalOpen, setIsModalOpen } = useModal();

  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        bgRef.current &&
        containerRef.current &&
        e.target === bgRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        callback && disable !== true
      ) {
        callback();
        setIsModalOpen(false);
      }
    };
    bgRef.current?.addEventListener("mousedown", handleClick);
    return () => bgRef.current?.removeEventListener("mousedown", handleClick);
  }, [callback]);

  return (
    <div
      className={`fixed inset-0 opacity-0 ${
        isModalOpen ? "opacity-100" : "pointer-events-none"
      } transition-opacity duration-300 ease-in-out`}
    >
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div
        ref={bgRef}
        className="flex items-center justify-center fixed inset-0"
      >
        <div ref={containerRef}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
