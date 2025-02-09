import UserDashboardLayout from "@/components/layouts/UserDashboard";

import MyInterviews from "@/components/pages/User/Jobs/interviews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Interviewing Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const InterviewedJobs = () => {
  return (
    <div>
      <UserDashboardLayout>
        <MyInterviews />
      </UserDashboardLayout>
    </div>
  );
};

export default InterviewedJobs;
