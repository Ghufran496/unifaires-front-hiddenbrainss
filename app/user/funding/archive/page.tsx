import UserDashboardLayout from "@/components/layouts/UserDashboard";
import MyFundingArchives from "@/components/pages/User/Funding/Archived";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Archived Fundings ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Archeived = () => {
  return (
    <UserDashboardLayout>
      <MyFundingArchives />
    </UserDashboardLayout>
  );
};

export default Archeived;
