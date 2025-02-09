import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import StudentsPage from "@/components/pages/Business/Students";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Business Course Detail",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const CourseDetails = () => {
  return (
    <BusinessDashboardLayout>
      <StudentsPage />
    </BusinessDashboardLayout>
  );
};

export default CourseDetails;
