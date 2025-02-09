import UserDashboardLayout from "@/components/layouts/UserDashboard";

import MyAcceptedFunding from "@/components/pages/User/Funding/Accepted";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Accepted Fundings ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const AcceptedJobs = () => {
  return (
    <div>
      <UserDashboardLayout>
        <MyAcceptedFunding />
      </UserDashboardLayout>
    </div>
  );
};

export default AcceptedJobs;
