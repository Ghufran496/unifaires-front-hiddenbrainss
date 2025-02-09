import UserDashboardLayout from "@/components/layouts/UserDashboard";
import FundingPage from "@/components/pages/User/Funding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Fundings or Scholarships",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Fundings = () => {
  return (
    <UserDashboardLayout>
      <FundingPage />
    </UserDashboardLayout>
  );
};

export default Fundings;
