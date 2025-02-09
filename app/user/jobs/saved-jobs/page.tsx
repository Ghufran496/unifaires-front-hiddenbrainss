import UserDashboardLayout from "@/components/layouts/UserDashboard";
import dynamic from "next/dynamic";
// app components

import MySavedJobs from "@/components/pages/User/Jobs/SavedJobs/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - User Saved Jobs",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const SavedJobs = () => {
  return (
    <div>
      <UserDashboardLayout>
        <MySavedJobs />
      </UserDashboardLayout>
    </div>
  );
};

export default SavedJobs;
