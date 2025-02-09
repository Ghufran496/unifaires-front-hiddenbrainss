import SkillsPage from "@/components/pages/Skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Skills",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Skills = () => {
  return <SkillsPage />;
};

export default Skills;
