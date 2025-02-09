// app components
import AboutPage from "@/components/pages/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | About",
  description: "About Unifaires",
  referrer: "no-referrer",
};

const About = () => {
  return <AboutPage />;
};

export default About;
