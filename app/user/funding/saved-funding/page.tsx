import UserDashboardLayout from "@/components/layouts/UserDashboard";
import MySavedFunding from "@/components/pages/User/Funding/SavedFundings"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unifaires - User Saved Fundings or Scholarships",
    description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
    referrer: "no-referrer",
  };

const SavedJobs = () => {
  return (
    <div>
      <UserDashboardLayout>
        <MySavedFunding />
      </UserDashboardLayout>
    </div>
  );
};

export default SavedJobs;
