import MentorshipApplication from "@/components/pages/MentoshipApplication/MentoshipApplication";
import { Metadata } from "next";
// app components

export const metadata: Metadata = {
  title: "Unifaires - Mentorship Application",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const mentorshipapplication = () => {
  return <MentorshipApplication />;
};

export default mentorshipapplication;
