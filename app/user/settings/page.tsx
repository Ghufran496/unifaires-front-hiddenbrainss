import UserDashboardLayout from "@/components/layouts/UserDashboard";
import Settings from "@/components/pages/User/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | User Settings",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Account = () => {
  return (
    <UserDashboardLayout>
      <Settings />
    </UserDashboardLayout>
  );
};

export default Account;
