import ResultPage from "@/components/pages/Results";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Result",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Results = () => {
  return <ResultPage />;
};

export default Results;
