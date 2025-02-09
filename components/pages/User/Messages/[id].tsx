"use client";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
// app components
import MessagesPage from "./components";
import ChatSection from "./ChatSection";

const Messages = () => {
  return (
    <UserDashboardLayout>
      <MessagesPage>
        <ChatSection />
      </MessagesPage>
    </UserDashboardLayout>
  );
};

export default Messages;
