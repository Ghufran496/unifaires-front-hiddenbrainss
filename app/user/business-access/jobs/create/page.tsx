import UserDashboardLayout from "@/components/layouts/UserDashboard";
import { Metadata } from "next";
import JobCreate from "@/components/pages/User/Manage-Access/Manage-Jobs/Create";

export const metadata: Metadata = {
  title: "Unifaires - Create Job",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const CreateJob = () => {
  return (
    <UserDashboardLayout>
      <JobCreate />
    </UserDashboardLayout>
  );
};

export default CreateJob;
