import UserDashboardLayout from "@/components/layouts/UserDashboard";

import MyAcceptedJobs from "@/components/pages/User/Jobs/Accepted";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Accepted Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const AcceptedJobs = () => {
  return (
    <div>
      <UserDashboardLayout>
        <MyAcceptedJobs />
      </UserDashboardLayout>
    </div>
  );
};

export default AcceptedJobs;
