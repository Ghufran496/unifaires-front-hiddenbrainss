import FundingsPage from "@/components/pages/Funding";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Unifaires | Fundings and Scholarships",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Career = () => {
  return (
    <Suspense fallback={<Loading />}>
      <FundingsPage />
    </Suspense>
  );
};

export default Career;
