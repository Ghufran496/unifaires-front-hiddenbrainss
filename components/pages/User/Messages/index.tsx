"use client";
import React, { useEffect } from "react";
// antd components
import { Empty, Typography } from "antd";
// app layout
import MessagesPage from "./components";
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ChatSection from "./ChatSection";
import { fetchAllChats } from "@/redux/features/messages/chatsSlices";
// app components

const Messages = () => {
  // fetch all user chat
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector((state) => state.chat.currentChat);

  useEffect(() => {
    dispatch(fetchAllChats());
  }, [currentChat, dispatch]);

  return (
    <MessagesPage>
      {!currentChat ? (
        <div className="grid place-items-center h-screen">
          <Empty
            description={
              <div className="text-center">
                <Typography.Title level={4}>No Chats</Typography.Title>
                <Typography.Text>
                  Search your contact list to start a conversation
                </Typography.Text>
              </div>
            }
          ></Empty>
        </div>
      ) : (
        <ChatSection />
      )}
    </MessagesPage>
  );
};

export default Messages;
