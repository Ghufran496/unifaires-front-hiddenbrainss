import UserDashboardLayout from "@/components/layouts/UserDashboard";
import MyRejectedFunding from "@/components/pages/User/Funding/Rejected";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Rejected Fundings",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const RejectedJobs = () => {
  return (
    <div>
      <UserDashboardLayout>
        <MyRejectedFunding />
      </UserDashboardLayout>
    </div>
  );
};

export default RejectedJobs;
