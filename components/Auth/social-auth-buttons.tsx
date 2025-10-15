import { authClient } from "@/lib/auth/auth-client";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const SocialAuthButtons = () => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() =>
          authClient.signIn.social({ provider: "google", callbackURL: "/" })
        }
        className="flex items-center cursor-pointer gap-2 py-1 rounded flex-1 justify-center border"
      >
        <FaGoogle />
        <h1>Google</h1>
      </button>
      <button
        type="button"
        onClick={() =>
          authClient.signIn.social({ provider: "github", callbackURL: "/" })
        }
        className="flex items-center cursor-pointer gap-2 py-1 rounded flex-1 justify-center border"
      >
        <FaGithub />
        <h1>Github</h1>
      </button>
    </div>
  );
};

export default SocialAuthButtons;
