import PrivacyNotice from "@/components/pages/PrivacyNotice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Privacy Notice",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const Pricing = () => {
  return <PrivacyNotice />;
};

export default Pricing;
