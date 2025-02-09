import InvitationPage from "@/components/pages/Invitation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Invitation",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const Invitation = () => {
  return <InvitationPage />;
};

export default Invitation;
