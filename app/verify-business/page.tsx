import BusinessVerifyPage from "@/components/pages/Auth/BusinessVerify";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Business Verification ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const BusinessVerify = () => {
  return <BusinessVerifyPage />;
};

export default BusinessVerify;
