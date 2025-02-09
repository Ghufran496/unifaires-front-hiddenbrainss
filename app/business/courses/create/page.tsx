import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import CreateCoursePage from "@/components/pages/Business/Courses/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Create Course",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const create = () => {
  return (
    <BusinessDashboardLayout>
      <CreateCoursePage />
    </BusinessDashboardLayout>
  );
};

export default create;
