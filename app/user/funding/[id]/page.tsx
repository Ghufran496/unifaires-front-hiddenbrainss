import UserDashboardLayout from "@/components/layouts/UserDashboard";

import DetailsPage from "@/components/pages/User/Funding/FundingDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Interviewing Fundings ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Details = () => {
  return;
  <UserDashboardLayout>
    <DetailsPage />
  </UserDashboardLayout>;
};

export default Details;
