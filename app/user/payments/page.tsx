import Payments from "@/components/pages/User/Payments";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Payments",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Payment = () => {
  return (
    <UserDashboardLayout>
      <Payments />
    </UserDashboardLayout>
  );
};

export default Payment;
