import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import Settings from "@/components/pages/Business/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Business Settings",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const Account = () => {
  return (
    <BusinessDashboardLayout>
      <Settings />
    </BusinessDashboardLayout>
  );
};

export default Account;
