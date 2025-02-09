import FundingDetailPage from "@/components/pages/FundingDetail";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Unifaires | Funding Details",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const JobDetail = () => {
  return <FundingDetailPage />;
};

export default JobDetail;
