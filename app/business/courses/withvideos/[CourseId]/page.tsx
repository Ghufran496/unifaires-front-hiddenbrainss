"use client";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { CourseProvider } from "@/components/pages/Business/Courses/Create/CourseContext";
import { useParams } from "next/navigation";

const CourseId = () => {
  const router = useParams();
  const courseId = router.CourseId;

  return (
    <BusinessDashboardLayout>
      <CourseProvider courseId={courseId} />
    </BusinessDashboardLayout>
  );
};

export default CourseId;
