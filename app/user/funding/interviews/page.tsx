import UserDashboardLayout from "@/components/layouts/UserDashboard";
import MyInterviews from "@/components/pages/User/Funding/interviews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Interviewing Fundings ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const InterviewedFunding = () => {
  return (
    <div>
      <UserDashboardLayout>
        <MyInterviews />
      </UserDashboardLayout>
    </div>
  );
};

export default InterviewedFunding;
