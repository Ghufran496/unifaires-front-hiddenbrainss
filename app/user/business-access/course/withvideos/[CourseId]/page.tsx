"use client";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import { CourseProvider } from "@/components/pages/User/Manage-Access/Mange-Course/Create/CourseContext";
import { useParams } from "next/navigation";
const CourseId = () => {
  const params = useParams();
  const courseId = params?.CourseId;

  return (
    <UserDashboardLayout>
      <CourseProvider courseId={courseId} />
    </UserDashboardLayout>
  );
};

export default CourseId;
