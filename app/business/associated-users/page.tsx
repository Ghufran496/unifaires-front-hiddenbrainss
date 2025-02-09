import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import AssociatedUsersPage from "@/components/pages/Business/AssociatedUsers";
import { Metadata } from "next";
4;
export const metadata: Metadata = {
  title: "Unifaires | Associated Users",
  description: "Unifaires cart page",
  referrer: "no-referrer",
};

const AssociateUsers = () => {
  return (
    <BusinessDashboardLayout>
      <AssociatedUsersPage />
    </BusinessDashboardLayout>
  );
};

export default AssociateUsers;
