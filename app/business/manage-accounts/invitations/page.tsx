import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import InvitationsPage from "@/components/pages/Business/ManageInvitations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Business Invitations",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Invitations = () => {
  return (
    <BusinessDashboardLayout>
      <InvitationsPage />
    </BusinessDashboardLayout>
  );
};

export default Invitations;
