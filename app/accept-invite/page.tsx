import AcceptInvitePage from "@/components/pages/Auth/AcceptInvite";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Unifaires | Accept Invitation",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Verify = () => {
  return <AcceptInvitePage />;
};

export default Verify;
