import UserDashboardLayout from "@/components/layouts/UserDashboard";
import UserFundingDetailsPage from "@/components/pages/User/Manage-Access/Manage-Funding/Details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage Funding",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const UserFundingDetails = () => {
  return (
    <UserDashboardLayout>
      <UserFundingDetailsPage />
    </UserDashboardLayout>
  );
};

export default UserFundingDetails;
