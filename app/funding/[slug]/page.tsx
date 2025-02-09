import FundingDetailsPage from "@/components/pages/FundingDetail";
import { Metadata } from "next";
// app components

export const metadata: Metadata = {
  title: "Unifaires | Fundings or Scholarship Details",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const FundingId = () => {
  return <FundingDetailsPage />;
};

export default FundingId;
