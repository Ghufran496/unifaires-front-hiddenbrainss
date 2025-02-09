import AdminDashboardLayout from "@/components/layouts/BusinessDashboard";
// app components
import FundingDetailsPage from "@/components/pages/Business/Funding/Details";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Business Fundings Detail",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const FundingDetails = () => {
  return (
    <BusinessDashboardLayout>
      <FundingDetailsPage />
    </BusinessDashboardLayout>
  );
};

export default FundingDetails;
