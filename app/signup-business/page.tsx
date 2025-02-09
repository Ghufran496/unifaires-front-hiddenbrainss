import SignupBusinessPage from "@/components/pages/Auth/SignupBusiness";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Business Sign up",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const SignupBusiness = () => {
  return <SignupBusinessPage />;
};

export default SignupBusiness;
