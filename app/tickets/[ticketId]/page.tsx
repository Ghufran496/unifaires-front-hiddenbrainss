import TrackTickets from "@/components/pages/Tickets/TicketsId";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Track Tickets",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const TicketID = () => {
  return <TrackTickets />;
};

export default TicketID;
