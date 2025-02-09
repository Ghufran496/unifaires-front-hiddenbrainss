import PreviewPage from "@/components/pages/Hire/Preview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Preview Hire",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const Preview = () => {
  return <PreviewPage />;
};

export default Preview;
