import PartnershipPage from "@/components/pages/Partnership";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Partnership",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Partnership = () => {
  return <PartnershipPage />;
};

export default Partnership;
