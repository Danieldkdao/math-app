"use client";

import React, { ReactNode, useState } from "react";
import { FaAddressBook } from "react-icons/fa6";
import LoadingSpinner from "./loading-spinner";
import toast from "react-hot-toast";

type ActionButtonProps = {
  action: (...args: any[]) => Promise<any> | any;
  successMessage: string;
  children: ReactNode;
  className: string;
  disabled?: boolean;
};

const ActionButton = ({
  action,
  successMessage,
  children,
  className,
  disabled,
}: ActionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const submitFunction = async () => {
    if(loading) return;
    setLoading(true);
    await action();
    toast.success(successMessage);
    setLoading(false);
  };

  return (
    <button disabled={loading || disabled} onClick={submitFunction} className={`${className} ${disabled || loading ? "opacity-60" : ""}`}>
      {loading ? (
        <LoadingSpinner color="border-black" size="size-10" thickness="border-4 border-black"/>
      ) : (
        children
      )}
    </button>
  );
};

export default ActionButton;
