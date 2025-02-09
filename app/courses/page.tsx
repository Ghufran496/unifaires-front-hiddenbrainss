import CoursesPage from "@/components/pages/Courses";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Unifaires | Courses",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Courses = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CoursesPage />
    </Suspense>
  );
};

export default Courses;
