import UserDashboardLayout from "@/components/layouts/UserDashboard";
import AllUserTransactions from "@/components/pages/User/Payments/Transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | User Transactions",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const AllTransactions = () => {
  return (
    <UserDashboardLayout>
      <AllUserTransactions />
    </UserDashboardLayout>
  );
};

export default AllTransactions;
