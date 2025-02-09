import TermsOfUse from "@/components/pages/Terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Terms of Use",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const Pricing = () => {
  return <TermsOfUse />;
};

export default Pricing;
