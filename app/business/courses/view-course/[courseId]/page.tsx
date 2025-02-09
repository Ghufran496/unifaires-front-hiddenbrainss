import CourseVideoPage from "@/components/pages/CourseVideo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - View Course",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const BusinessCourseVideo = () => {
  return <CourseVideoPage />;
};

export default BusinessCourseVideo;
