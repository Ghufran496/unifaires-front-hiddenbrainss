import UserDashboardLayout from "@/components/layouts/UserDashboard";
// app components
import TalentDetails from "@/components/pages/User/VettedTalents/[talentId]";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Talent Details",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const VettedTalentsProgramDetails = () => {
  return (
    <UserDashboardLayout>
      <TalentDetails />
    </UserDashboardLayout>
  );
};

export default VettedTalentsProgramDetails;
