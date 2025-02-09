import UserDashboardLayout from "@/components/layouts/UserDashboard";
import dynamic from "next/dynamic";
// app components
import ContactList from "@/components/pages/User/Messages/ContactList/ContactList.tsx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Message Contacts",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Contact = () => {
  return (
    <UserDashboardLayout>
      <ContactList />
    </UserDashboardLayout>
  );
};

export default Contact;
