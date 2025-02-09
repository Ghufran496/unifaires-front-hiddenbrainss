import ContactPages from "@/components/pages/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Contact us",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Contact = () => {
  return <ContactPages />;
};

export default Contact;
