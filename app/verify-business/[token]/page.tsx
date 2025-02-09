import BusinessVerifyTokenPage from "@/components/pages/Auth/BusinessVerify/VerifyToken";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Business Verification ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const BusinessVerifyToken = () => {
  return <BusinessVerifyTokenPage />;
};

export default BusinessVerifyToken;
