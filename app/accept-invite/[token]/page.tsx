import VerifyInviteToken from "@/components/pages/Auth/AcceptInvite/VerifyInviteToken";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Verify Invite Token",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};
const VerifyToken = () => {
  return <VerifyInviteToken />;
};

export default VerifyToken;
