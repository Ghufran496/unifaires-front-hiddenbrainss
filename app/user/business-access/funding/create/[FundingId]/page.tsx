"use client";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import { FundingProvider } from "@/components/pages/User/Manage-Access/Manage-Funding/Create/FundingContext";
import { useParams } from "next/navigation";

const FundingId = () => {
  const params = useParams();
  const fundingId = params?.FundingId;

  return (
    <UserDashboardLayout>
      <FundingProvider fundingId={fundingId} />
    </UserDashboardLayout>
  );
};

export default FundingId;
