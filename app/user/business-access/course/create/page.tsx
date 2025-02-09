import UserDashboardLayout from "@/components/layouts/UserDashboard";
import CreateCoursePage from "@/components/pages/User/Manage-Access/Mange-Course/Create/WithVideos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Manage Course",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const create = () => {
  return (
    <UserDashboardLayout>
      <CreateCoursePage />
    </UserDashboardLayout>
  );
};

export default create;
