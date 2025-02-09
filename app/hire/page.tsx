import HirePage from "@/components/pages/Hire";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Join Us",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Hire = () => {
  return <HirePage />;
};

export default Hire;
