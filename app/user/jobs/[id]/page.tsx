import UserDashboardLayout from "@/components/layouts/UserDashboard";
import DetailsPage from "@/components/pages/User/Jobs/JobDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Job Details",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const UserJobDetails = () => {
  return (
    <UserDashboardLayout>
      <DetailsPage />
    </UserDashboardLayout>
  );
};

export default UserJobDetails;
