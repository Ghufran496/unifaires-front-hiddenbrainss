import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import JobDetail from "@/components/pages/Business/Jobs/Details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Business Jobs Detail",
  description: "Unifaires cart page",
  referrer: "no-referrer",
};

const JobsDetails = () => {
  return (
    <BusinessDashboardLayout>
      <JobDetail />
    </BusinessDashboardLayout>
  );
};

export default JobsDetails;
