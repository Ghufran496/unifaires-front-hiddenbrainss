import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
// app components
import JobsPage from "@/components/pages/Business/Jobs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Business Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Jobs = () => {
  return (
    <BusinessDashboardLayout>
      <JobsPage />
    </BusinessDashboardLayout>
  );
};

export default Jobs;
