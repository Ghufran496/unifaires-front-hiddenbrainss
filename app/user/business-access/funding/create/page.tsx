import UserDashboardLayout from "@/components/layouts/UserDashboard";
import UserCreateFundingPage from "@/components/pages/User/Manage-Access/Manage-Funding/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage Funding",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const UserCreateFunding = () => {
  return (
    <UserDashboardLayout>
      <UserCreateFundingPage />
    </UserDashboardLayout>
  );
};

export default UserCreateFunding;
