import ResetPage from "@/components/pages/Auth/Reset";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Unifaires | Reset",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const Reset = () => {
  return <ResetPage />;
};

export default Reset;
