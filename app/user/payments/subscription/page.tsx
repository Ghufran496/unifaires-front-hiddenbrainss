import SubscriptionPlan from "@/components/pages/User/Payments/SubscriptionPlan";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Subscriptions",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Subscription = () => {
  return (
    <UserDashboardLayout>
      <SubscriptionPlan />
    </UserDashboardLayout>
  );
};

export default Subscription;
