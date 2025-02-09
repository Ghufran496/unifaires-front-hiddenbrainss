import UserDashboardLayout from "@/components/layouts/UserDashboard";
import AddPurchaseOrder from "@/components/pages/User/Order/PurchasedOrders/AddPurchaseOrder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Sending Money",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const AddPurchase = () => {
  return (
    <div>
      <UserDashboardLayout>
        <AddPurchaseOrder />
      </UserDashboardLayout>
    </div>
  );
};

export default AddPurchase;
