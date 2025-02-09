import { Metadata } from "next";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import CoursesPage from "@/components/pages/Business/Courses";

export const metadata: Metadata = {
  title: "Unifaires - Business Dashboard",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Courses = () => {
  return (
    <BusinessDashboardLayout>
      <CoursesPage />
    </BusinessDashboardLayout>
  );
};

export default Courses;
