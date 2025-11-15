"use client";

import React, { useEffect, useRef, useState } from "react";
import ActionButton from "../General/action-button";
import { authClient } from "@/lib/auth/auth-client";

const EmailVerification = ({ email }: { email: string }) => {
  const [timeToNextReset, setTimeToNextReset] = useState(30);
  const interval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    countdownToReset();
  }, []);

  const countdownToReset = (time = 30) => {
    setTimeToNextReset(time);
    interval.current = setInterval(() => {
      setTimeToNextReset((t) => {
        const newT = t - 1;
        if (newT <= 0) {
          clearInterval(interval.current);
          return 0;
        }
        return newT;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold text-center">Verify your email</h1>
      <p className="text-center">
        We sent you a verification link. Please check your email and click the
        link to verify your account.
      </p>
      <ActionButton
        action={() => {
          countdownToReset();
          return authClient.sendVerificationEmail({ email, callbackURL: "/" });
        }}
        successMessage="Verification email resent!"
        className="p-2 w-full max-w-48 border-2 rounded text-xl font-medium active:scale-95 transition-transform duration-100 ease-in-out cursor-pointer flex items-center justify-center"
        disabled={timeToNextReset > 0}
      >
        {timeToNextReset > 0 ? `Resend (${timeToNextReset})` : "Resend"}
      </ActionButton>
    </div>
  );
};

export default EmailVerification;
