"use client";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { FundingProvider } from "@/components/pages/Business/Funding/Create/FundingContext";
import { useParams } from "next/navigation";

const FundingId = () => {
  const router = useParams();
  const fundingId = router?.FundingId;

  return (
    <BusinessDashboardLayout>
      <FundingProvider fundingId={fundingId} />
    </BusinessDashboardLayout>
  );
};

export default FundingId;
