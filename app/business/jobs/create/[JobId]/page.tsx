import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { Metadata } from "next";
import JobEdit from "@/components/pages/Business/Jobs/Edit";

export const metadata: Metadata = {
  title: "Unifaires - Business Jobs Edit",
  description: "Unifaires cart page",
  referrer: "no-referrer",
};

const JobIdEdit = () => {
  return (
    <BusinessDashboardLayout>
      <JobEdit />
    </BusinessDashboardLayout>
  );
};

export default JobIdEdit;
