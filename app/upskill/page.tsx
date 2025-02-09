import UpSkillPage from "@/components/pages/Upskill";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | UpSkill",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const Mentorship = () => {
  return <UpSkillPage />;
};

export default Mentorship;
