import GeneralSearchPage from "@/components/pages/UnifairesSearch";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";
export const metadata: Metadata = {
  title: "Unifaires | General Search",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const GeneralSearch = () => {
  return (
    <Suspense fallback={<Loading />}>
      <GeneralSearchPage />
    </Suspense>
  );
};

export default GeneralSearch;
