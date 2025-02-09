import UserDashboardLayout from "@/components/layouts/UserDashboard";
import SendingMoney from "@/components/pages/User/Payments/SendMoney";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Sending Money",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const SendMoney = () => {
  return (
    <UserDashboardLayout>
      <SendingMoney />
    </UserDashboardLayout>
  );
};

export default SendMoney;
