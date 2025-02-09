import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
// app components
import ManageAlumni from "@/components/pages/Business/ManageAlumni";

const InstructorApplications = () => {
  return (
    <BusinessDashboardLayout>
      <ManageAlumni />
    </BusinessDashboardLayout>
  );
};

export default InstructorApplications;
