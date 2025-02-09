import FundingPage from "@/components/pages/Business/Funding";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Business Fundings",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Funding = () => {
  return (
    <BusinessDashboardLayout>
      <FundingPage />
    </BusinessDashboardLayout>
  );
};

export default Funding;
