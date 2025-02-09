import UserDashboardLayout from "@/components/layouts/UserDashboard";
import MakePayments from "@/components/pages/User/Payments/MakePayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Make Payment",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const MakePayment = () => {
  return (
    <UserDashboardLayout>
      <MakePayments />
    </UserDashboardLayout>
  );
};

export default MakePayment;
