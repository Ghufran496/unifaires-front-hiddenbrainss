import PricingPage from "@/components/pages/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Pricing",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Pricing = () => {
  return <PricingPage />;
};

export default Pricing;
