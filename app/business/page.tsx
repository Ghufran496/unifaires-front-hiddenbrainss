import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import Dashboard from "@/components/pages/Business/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Business Dashboard",
  description: "Unifaires cart page",
  referrer: "no-referrer",
};

const BusinessHome = () => {
  return (
    <BusinessDashboardLayout>
      <Dashboard />
    </BusinessDashboardLayout>
  );
};

export default BusinessHome;
