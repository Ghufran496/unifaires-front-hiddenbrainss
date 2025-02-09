import VerifyPage from "@/components/pages/Auth/verify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | User Email Verification",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Verify = () => {
  return <VerifyPage />;
};

export default Verify;
