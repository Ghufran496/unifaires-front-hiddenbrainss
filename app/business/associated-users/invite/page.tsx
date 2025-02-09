import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import AddAssociatedUser from "@/components/pages/Business/AssociatedUsers/InviteUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Associated Users",
  description: "Unifaires cart page",
  referrer: "no-referrer",
};

const InviteAssociatedUser = () => {
  return (
    <BusinessDashboardLayout>
      <AddAssociatedUser />
    </BusinessDashboardLayout>
  );
};

export default InviteAssociatedUser;
