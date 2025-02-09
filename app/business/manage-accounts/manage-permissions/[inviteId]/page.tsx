import ManagePermissionsPage from "@/components/pages/Business/ManagePermissions";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Business Manage Permissions",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const ManageIndividualPermissions = () => {
  return (
    <BusinessDashboardLayout>
      <ManagePermissionsPage />
    </BusinessDashboardLayout>
  );
};

export default ManageIndividualPermissions;
