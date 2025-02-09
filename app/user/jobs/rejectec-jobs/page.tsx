import UserDashboardLayout from "@/components/layouts/UserDashboard";
import MyRejectedJobs from "@/components/pages/User/Jobs/Rejected";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Rejected Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const RejectedJobs = () => {
  return (
    <div>
      <UserDashboardLayout>
        <MyRejectedJobs />
      </UserDashboardLayout>
    </div>
  );
};

export default RejectedJobs;
