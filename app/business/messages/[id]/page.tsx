import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
// app components
import MessagesPage from "@/components/pages/Business/Messages";
import ChatSection from "@/components/pages/Business/Messages/ChatSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires - Business Messages",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Messages = () => {
  return (
    <BusinessDashboardLayout>
      <MessagesPage>
        <ChatSection />
      </MessagesPage>
    </BusinessDashboardLayout>
  );
};

export default Messages;
