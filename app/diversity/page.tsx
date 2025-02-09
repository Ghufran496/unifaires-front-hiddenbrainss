import DiversityPage from "@/components/pages/Diversity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Diversity",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const Diversity = () => {
  return <DiversityPage />;
};

export default Diversity;
