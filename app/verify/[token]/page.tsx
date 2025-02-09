import VerifyTokenPage from "@/components/pages/Auth/verify/VerifyToken";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Verify Token",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const VerifyToken = () => {
  return <VerifyTokenPage />;
};

export default VerifyToken;
