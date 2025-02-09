import AcademicPartnerPage from "@/components/pages/AcademicPartner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Partners",
  description: "Unifaires partners",
  referrer: "no-referrer",
};

const Talents = () => {
  return <AcademicPartnerPage />;
};

export default Talents;
