import CourseVideoPage from "@/components/pages/CourseVideo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Course Video",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const CourseVideo = () => {
  return <CourseVideoPage />;
};

export default CourseVideo;
