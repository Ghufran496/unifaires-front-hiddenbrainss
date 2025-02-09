import UserDashboardLayout from "@/components/layouts/UserDashboard";
import JobEdit from "@/components/pages/User/Manage-Access/Manage-Jobs/Edit";

const JobId = () => {
  return (
    <UserDashboardLayout>
      <JobEdit />
    </UserDashboardLayout>
  );
};

export default JobId;
