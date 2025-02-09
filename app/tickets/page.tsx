import TicketsPage from "@/components/pages/Tickets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Support and Tickets",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Tickets = () => {
  return <TicketsPage />;
};

export default Tickets;
