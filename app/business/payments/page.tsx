import Payments from "@/components/pages/Business/Payments";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Business Payments Page",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Payment = () => {
  return (
    <BusinessDashboardLayout>
      <Payments />
    </BusinessDashboardLayout>
  );
};

export default Payment;
