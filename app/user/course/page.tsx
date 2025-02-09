import UserDashboardLayout from "@/components/layouts/UserDashboard";
import Learning from "@/components/pages/User/Learning";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | User Courses",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const MyCourses = () => {
  return (
    <UserDashboardLayout>
      <Learning />
    </UserDashboardLayout>
  );
};

export default MyCourses;
