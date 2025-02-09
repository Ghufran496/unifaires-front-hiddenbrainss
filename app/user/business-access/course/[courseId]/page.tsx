import UserDashboardLayout from "@/components/layouts/UserDashboard";
import StudentsPage from "@/components/pages/User/Manage-Access/Mange-Course/Students";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage Course",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const CourseDetails = () => {
  return (
    <UserDashboardLayout>
      <StudentsPage />
    </UserDashboardLayout>
  );
};

export default CourseDetails;
