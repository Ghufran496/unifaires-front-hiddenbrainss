import CustomLoader from "@/components/layouts/CustomLoader";
import CareerPage from "@/components/pages/career";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Unifaires | Jobs ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Career = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CareerPage />
    </Suspense>
  );
};

export default Career;
