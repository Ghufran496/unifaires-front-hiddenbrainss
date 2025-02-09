import MentorshipPage from "@/components/pages/Mentorship";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Mentorship",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Mentorship = () => {
  return <MentorshipPage />;
};

export default Mentorship;
