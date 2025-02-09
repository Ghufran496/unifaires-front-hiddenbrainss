import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import MakePayments from "@/components/pages/Business/Payments/MakePayment";
import { Metadata } from "next";
// app components

export const metadata: Metadata = {
  title: "Unifaires - Business Payments",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const MakePayment = () => {
  return (
    <BusinessDashboardLayout>
      <MakePayments />
    </BusinessDashboardLayout>
  );
};

export default MakePayment;
