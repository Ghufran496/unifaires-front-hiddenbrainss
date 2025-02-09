import PrivacyPage from "@/components/pages/Privacy";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Unifaires | Privacy Page",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Privacy = () => {
  return <PrivacyPage />;
};

export default Privacy;
