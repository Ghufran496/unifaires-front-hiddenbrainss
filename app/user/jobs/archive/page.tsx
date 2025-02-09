import UserDashboardLayout from "@/components/layouts/UserDashboard";
import MyJobArchives from "@/components/pages/User/Jobs/Archived";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Archived Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Archeived = () => {
  return (
    <UserDashboardLayout>
      <MyJobArchives />
    </UserDashboardLayout>
  );
};

export default Archeived;
