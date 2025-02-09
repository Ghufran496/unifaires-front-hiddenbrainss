"use client";
import { socket } from "@/app/utils/socket";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// App components
import MessagesPage from "@/components/pages/User/Messages";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";

const MessagesId = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    socket.on("getOnlineUsers", (users) => {
      console.log(users);
      setOnlineUsers(users);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, []);

  useEffect(() => {
    if (!isConnected) return;

    if (status === "authenticated") {
      if (session.user.companyName) {
        socket.emit("addNewUser", { businessId: session.user.id });
      } else {
        socket.emit("addNewUser", { userId: session.user.id });
      }
    }
  }, [isConnected]);

  return (
    <BusinessDashboardLayout>
      <MessagesPage />
    </BusinessDashboardLayout>
  );
};

export default MessagesId;
