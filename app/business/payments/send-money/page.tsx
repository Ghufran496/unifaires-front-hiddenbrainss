import SendingMoney from "@/components/pages/Business/Payments/SendMoney";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { Metadata } from "next";
// app components

export const metadata: Metadata = {
  title: "Unifaires - Business Send Money",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const SendMoney = () => {
  return (
    <BusinessDashboardLayout>
      <SendingMoney />
    </BusinessDashboardLayout>
  );
};

export default SendMoney;
