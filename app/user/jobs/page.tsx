import UserDashboardLayout from "@/components/layouts/UserDashboard";
import JobsPage from "@/components/pages/User/Jobs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Jobs = () => {
  return (
    <UserDashboardLayout>
      <JobsPage />
    </UserDashboardLayout>
  );
};

export default Jobs;
