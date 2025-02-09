import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
// app components
import CreateJobPage from "@/components/pages/Business/Jobs/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Business Jobs Creation",
  description: "Unifaires cart page",
  referrer: "no-referrer",
};

const CreateJob = () => {
  return (
    <BusinessDashboardLayout>
      <CreateJobPage />
    </BusinessDashboardLayout>
  );
};

export default CreateJob;
