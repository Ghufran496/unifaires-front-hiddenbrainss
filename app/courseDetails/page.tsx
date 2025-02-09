import CourseDetailPage from "@/components/pages/CourseDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Course Details",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const JobDetail = () => {
  return <CourseDetailPage />;
};

export default JobDetail;
