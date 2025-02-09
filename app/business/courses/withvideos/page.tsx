import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import CreateCourse from "@/components/pages/Business/Courses/Create/WithVideos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Create Course",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const withvideos = () => {
  return (
    <BusinessDashboardLayout>
      <CreateCourse />
    </BusinessDashboardLayout>
  );
};

export default withvideos;
