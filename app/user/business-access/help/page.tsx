import UserDashboardLayout from "@/components/layouts/UserDashboard";
import { Metadata } from "next";
import HelpAndSupport from "./helpAndSupport";

export const metadata: Metadata = {
  title: "Unifaires - Help & Support",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Help = () => {
  return (
    <UserDashboardLayout>
      <HelpAndSupport />
    </UserDashboardLayout>
  );
};

export default Help;
