import UserDashboardLayout from "@/components/layouts/UserDashboard";
import JobDetail from "@/components/pages/User/Manage-Access/Manage-Jobs/Details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage Job Details",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const JobsDetails = () => {
  return (
    <UserDashboardLayout>
      <JobDetail />
    </UserDashboardLayout>
  );
};

export default JobsDetails;
