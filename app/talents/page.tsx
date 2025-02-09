import TalentsPage from "@/components/pages/Talents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Talents",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Talents = () => {
  return <TalentsPage />;
};

export default Talents;
