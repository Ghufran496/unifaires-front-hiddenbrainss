"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

import ListContactMessages from "./ListContactsMessages";
import ListContactsChats from "./ListContactsChats";

const AllMessages = () => {
  // move data to chat

  const chats = useAppSelector((state) => state.chat.chats);
  const contacts = useAppSelector((state) => state.chat.contacts);

  return (
    <div className=" ">
      {contacts && contacts.length > 0 ? (
        <ListContactMessages contacts={contacts} />
      ) : (
        <ListContactsChats chats={chats} />
      )}
    </div>
  );
};

export default AllMessages;
