import UserDashboardLayout from "@/components/layouts/UserDashboard";
import Orders from "@/components/pages/User/Order";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unifaires - User Orders",
    description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
    referrer: "no-referrer",
  };

const orders = () => {
  return (
    <div>
      <UserDashboardLayout>
        <Orders />
      </UserDashboardLayout>
    </div>
  );
};

export default orders;
