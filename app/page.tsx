import HomePage from "@/components/pages/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

export default function Home() {
  return <HomePage />;
}
