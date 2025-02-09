import JobDetailPage from "@/components/pages/JobDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Job Details ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
// app components

const JobID = () => {
  return <JobDetailPage />;
};

export default JobID;
