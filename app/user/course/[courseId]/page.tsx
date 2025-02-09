import CourseVideoPage from "@/components/pages/CourseVideo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Taking Course",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const UserCourseVideo = () => {
  return <CourseVideoPage />;
};

export default UserCourseVideo;
