"use client";
import { setCurrentChat } from "@/redux/features/messages/chatsSlices";
import { useAppDispatch } from "@/redux/hooks";
import { Avatar, List, Tag, Typography } from "antd";

import { useSession } from "next-auth/react";

export default function ListContactsChats({ chats }: any) {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  return (
    <>
      <List
        dataSource={chats}
        itemLayout="horizontal"
        className="divide-y  divide-blue-200"
        renderItem={(item: any) => {
          const userId = session?.user?.id;

          const {
            senderId,
            receiverId,
            receiverType,
            senderType,
            userReceiver,
            userSender,
            businessReceiver,
            businessSender,
            chatmessages,
            id: chatId,
          } = item;

          let chatUserData: {
            firstname?: string;
            lastname?: string;
            companyName?: string;
          } = {};
          let model = "";

          if (userId === senderId) {
            chatUserData =
              receiverType === "user" ? userReceiver : businessReceiver;
            model = receiverType;
          } else if (userId === receiverId) {
            chatUserData = senderType === "user" ? userSender : businessSender;
            model = senderType;
          }

          const { firstname, lastname, companyName } = chatUserData;
          const currentChat = {
            ...chatUserData,
            chatId,
            senderId,
            receiverId,
            receiverType,
            senderType,
            userReceiver,
            userSender,
            businessReceiver,
            businessSender,
            chatmessages,
            model,
          };

          const name =
            model === "user" ? `${firstname} ${lastname}` : companyName;

          const initial =
            model === "user"
              ? `${currentChat.firstname ? currentChat.firstname[0] : ""}` +
                `${currentChat.lastname ? currentChat.lastname[0] : ""}`
              : currentChat.companyName
              ? currentChat.companyName[0]
              : "";

          const notifications = item.chatsnotifications.filter(
            (notification: any) => notification.receiverId === userId
          );

          const notification =
            notifications && notifications.length > 0 ? notifications[0] : null;

          return (
            <List.Item
              className="flex rounded-lg relative group/item transition-all hover:bg-[#5832DA] hover:bg-opacity-10 hover:text-[#5832DA]"
              onClick={() => {
                dispatch(setCurrentChat({ currentChat }));
              }}
              key={item.id}
            >
              <div className="flex w-full p-2 items-start gap-4">
                <Avatar
                  size={50}
                  className="grid place-items-center rounded-[74px] bg-purple-500"
                >
                  {initial}
                </Avatar>{" "}
                <div className="flex flex-col gap-2 grow">
                  <div className="flex items-center gap-[50px] mb-0">
                    <Typography.Title
                      level={5}
                      ellipsis
                      className=" text-base font-semibold leading-[19.2px] mb-0 grow"
                    >
                      {name}
                    </Typography.Title>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Typography.Link
                      ellipsis
                      className="stretched-link text-gray-500 text-base font-normal grow"
                    >
                      Hey, what’s the update ...
                    </Typography.Link>

                    <Tag className="text-white bg-purple-500 rounded-full">
                      {notification && notification.count > 0
                        ? notification.count
                        : ""}
                    </Tag>
                  </div>
                </div>
              </div>
            </List.Item>
          );
        }}
      />
    </>
  );
}
