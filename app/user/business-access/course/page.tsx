import UserDashboardLayout from "@/components/layouts/UserDashboard";
import CoursesPage from "@/components/pages/User/Manage-Access/Mange-Course";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage Course",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Courses = () => {
  return (
    <UserDashboardLayout>
      <CoursesPage />
    </UserDashboardLayout>
  );
};

export default Courses;
