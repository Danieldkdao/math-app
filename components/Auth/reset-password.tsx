"use client";

import { authClient } from "@/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import Logo from "@/public/math-app-logo.png";
import LoadingSpinner from "../General/loading-spinner";
import Image from 'next/image'

const ResetPassword = () => {
  const ForgotPasswordSchema = z.object({
    password: z
      .string()
      .min(6, { error: "Password must be at least 6 characters." }),
  });

  type ForgotPasswordFormType = z.infer<typeof ForgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const sendForgotPassword = async (data: ForgotPasswordFormType) => {
    if (token == null) return;
    await authClient.resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to reset password.");
        },
        onSuccess: () => {
          toast.success("Password reset successful!");
          router.push("/auth/login");
        },
      }
    );
  };

  if (token == null || error != null) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="border rounded-md p-5 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Invalid password reset link</h1>
          <p className="text-gray-700">
            The password reset link is invalid or has expired.
          </p>
          <Link
            href="/auth/login"
            className="py-2 px-5 rounded border-2 text-xl font-medium active:scale-95 transition-all ease-in-out mt-4"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(sendForgotPassword)}
        className="flex flex-col items-center gap-4 w-full max-w-[400px]"
      >
        <Image src={Logo} alt="Figured out logo" height={90} />
        <h1 className="text-4xl font-bold text-center">Reset Password</h1>
        <p className="text-center">Enter your new password below.</p>
        <div className="flex flex-col gap-2 w-full">
          <input
            {...register("password")}
            type="password"
            className={`border px-3 py-2 rounded outline-0 transition-all duration-200 ease-in-out ${
              errors.password ? "border-red-500 border-2" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="w-full border-2 rounded py-2 text-xl font-medium cursor-pointer active:scale-95 transition-transform duration-100 ease-in-out flex items-center justify-center"
        >
          {isSubmitting ? (
            <LoadingSpinner
              color="border-black"
              size="size-6"
              thickness="border-2"
            />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
