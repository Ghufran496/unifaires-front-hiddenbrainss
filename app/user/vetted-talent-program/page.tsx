import UserDashboardLayout from "@/components/layouts/UserDashboard";
// app components
import VettedTalents from "@/components/pages/User/VettedTalents";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Unifaires - Vetted Talents",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const VettedTalentsProgram = () => {
  return (
    <UserDashboardLayout>
      <VettedTalents />
    </UserDashboardLayout>
  );
};

export default VettedTalentsProgram;
