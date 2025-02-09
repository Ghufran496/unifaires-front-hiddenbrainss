"use client";
import PublicLayout from "@/components/layouts/Public";
import CourseVideoPage from "@/components/pages/CourseVideo";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const BusinessCourseVideo = () => {
  const { data: session } = useSession();
  const params = useParams();
  const courseId = params?.id;
  console.log({ session1: session });

  return (
    <>
      {typeof session?.user?.token === "string" ? (
        <>
          <UserDashboardLayout>
            <CourseVideoPage courseId={courseId} />
          </UserDashboardLayout>
        </>
      ) : (
        <>
          <PublicLayout>
            <CourseVideoPage courseId={courseId} />
          </PublicLayout>
        </>
      )}
    </>
  );
};

export default BusinessCourseVideo;
