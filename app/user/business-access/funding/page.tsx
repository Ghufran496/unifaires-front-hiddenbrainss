import UserDashboardLayout from "@/components/layouts/UserDashboard";
import UserFundingPage from "@/components/pages/User/Manage-Access/Manage-Funding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage Funding",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Funding = () => {
  return (
    <UserDashboardLayout>
      <UserFundingPage />
    </UserDashboardLayout>
  );
};

export default Funding;
