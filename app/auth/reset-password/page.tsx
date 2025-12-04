import ResetPassword from "@/components/Auth/reset-password";
import { connection } from "next/server";

const ResetPasswordPage = async () => {
  await connection();
  return (
    <ResetPassword />
  )
};

export default ResetPasswordPage;
