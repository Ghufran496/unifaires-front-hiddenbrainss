// app layout
import UserDashboardLayout from "@/components/layouts/UserDashboard";
// app components
import MessagesPage from "./MessageSections";
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
