import UserDashboardLayout from "@/components/layouts/UserDashboard";
import Dashboard from "@/components/pages/User/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Dashboard",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const UserHome = () => {
  return (
    <UserDashboardLayout>
      <Dashboard />
    </UserDashboardLayout>
  );
};

export default UserHome;
