import CreateFundingPage from "@/components/pages/Business/Funding/Create";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Create Funding",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const CreateFunding = () => {
  return (
    <BusinessDashboardLayout>
      <CreateFundingPage />
    </BusinessDashboardLayout>
  );
};

export default CreateFunding;
