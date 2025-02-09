import CreateInvitationsPage from "@/components/pages/Business/ManageInvitations/create";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Business Create Invite",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const CreateInvitation = () => {
  return (
    <BusinessDashboardLayout>
      <CreateInvitationsPage />
    </BusinessDashboardLayout>
  );
};

export default CreateInvitation;
