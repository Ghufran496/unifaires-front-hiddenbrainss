"use client";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import NewMessage from "./NewMessage";
// app components
import MessagesPage from "./components";
// import MessageSection from "./MessageSection";

const Messages = () => {
  return (
    <UserDashboardLayout>
      <MessagesPage>
        <NewMessage />
      </MessagesPage>
    </UserDashboardLayout>
  );
};

export default Messages;
