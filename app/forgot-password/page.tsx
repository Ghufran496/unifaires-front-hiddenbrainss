import ForgotPasswordPage from "@/components/pages/Auth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Forgot Password",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const ForgotPassword = () => {
  return <ForgotPasswordPage />;
};

export default ForgotPassword;
