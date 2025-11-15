"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import ActionButton from "../General/action-button";
import { authClient } from "@/lib/auth/auth-client";
import toast from "react-hot-toast";
import LoadingSpinner from "../General/loading-spinner";

const ForgotPasswordSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
});

type ForgotPasswordFormType = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const sendForgotPassword = async (data: ForgotPasswordFormType) => {
    await authClient.requestPasswordReset(
      {
        ...data,
        redirectTo: "/auth/reset-password",
      },
      {
        onError: (error) => {
          toast.error(
            error.error.message || "Failed to send password reset email."
          );
        },
        onSuccess: () => {
          toast.success("Password reset email sent successfully!");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(sendForgotPassword)}
      className="flex flex-col items-center gap-4"
    >
      <h1 className="text-4xl font-bold text-center">Forgot Password</h1>
      <p className="text-center">
        Enter your email below. We will send you a link to reset your
        password.
      </p>
      <div className="flex flex-col gap-2 w-full">
        <input
          {...register("email")}
          id="email"
          className={`border px-3 py-2 rounded outline-0 transition-all duration-200 ease-in-out ${
            errors.email ? "border-red-500 border-2" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <button
        disabled={isSubmitting}
        className="w-full border-2 rounded py-2 text-xl font-medium cursor-pointer active:scale-95 transition-transform duration-100 ease-in-out flex items-center justify-center"
      >
        {isSubmitting ? <LoadingSpinner color="border-black" size="size-6" thickness="border-2"/> : "Send Reset Email"}
      </button>
    </form>
  );
};

export default ForgotPassword;
