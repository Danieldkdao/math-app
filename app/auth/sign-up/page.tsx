"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SocialAuthButtons from "@/components/Auth/social-auth-buttons";
import { useApp } from "@/hooks/useApp";

const signUpSchema = z.object({
  name: z.string(),
  email: z.email({ error: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." }),
});

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });
  const router = useRouter();

  const { redirectIfSignedIn } = useApp();

  useEffect(() => {
    redirectIfSignedIn();
  }, [router]);

  const handleSignUp = async (data: SignUpForm) => {
    await authClient.signUp.email(
      { ...data, callbackURL: "/" },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to sign up");
        },
        onSuccess: () => {
          reset();
          router.push("/");
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 h-screen">
      <h1 className="text-4xl font-bold">Sign Up</h1>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col gap-4 border p-5 rounded-xl w-full max-w-[350px]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            id="name"
            className="border px-3 py-2 rounded outline-0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className={`transition-colors duration-200 ease-in-out ${
              errors.email ? "text-red-500" : ""
            }`}
          >
            Email
          </label>
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
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className={`transition-colors duration-200 ease-in-out ${
              errors.password ? "text-red-500" : ""
            }`}
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
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
          className={`bg-blue-200 rounded py-2 font-medium cursor-pointer ${
            isSubmitting ? "opacity-60" : ""
          }`}
        >
          Sign Up
        </button>
        <div className="flex items-center gap-2">
          <hr className="flex-1" />
          <h1>OR</h1>
          <hr className="flex-1" />
        </div>
        <SocialAuthButtons />
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-blue-400">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
