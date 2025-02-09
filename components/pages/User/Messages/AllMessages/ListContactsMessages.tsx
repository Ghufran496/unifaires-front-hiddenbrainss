"use client";

import { setCurrentChat } from "@/redux/features/messages/chatsSlices";
import { useAppDispatch } from "@/redux/hooks";
import axiosInstance from "@/app/utils/axios-config";
import { Avatar, List, Tag, Typography } from "antd";
import { useSession } from "next-auth/react";

export default function ListContactMessages({ contacts }: any) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  async function handleSetCurrentChat(item: any) {
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
      chatUserData = receiverType === "user" ? userReceiver : businessReceiver;
      model = receiverType;
    } else if (userId === receiverId) {
      chatUserData = senderType === "user" ? userSender : businessSender;
      model = senderType;
    }

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

    dispatch(setCurrentChat({ currentChat }));
  }
  async function getOrCreateChat(payload: any) {
    try {
      const data = {
        receiverType: payload.model.toLowerCase(),
        receiverId: payload.id,
      };
      const create = await axiosInstance.post("/chat/direct", data);

      if (create.status === 201) {
        handleSetCurrentChat(create.data.data);
      }

      if (create.status === 200) {
        handleSetCurrentChat(create.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <List
        dataSource={contacts}
        itemLayout="horizontal"
        className="divide-y  divide-blue-200"
        renderItem={(item: any) => {
          const model = item.model.toLowerCase();
          const name =
            model === "user"
              ? `${item.firstname} ${item.lastname}`
              : item.companyName;

          const initial =
            model === "user"
              ? `${item.firstname ? item.firstname[0] : ""}` +
                `${item.lastname ? item.lastname[0] : ""}`
              : item.companyName
              ? item.companyName[0]
              : "";

          return (
            <List.Item
              className="flex rounded-lg relative group/item transition-all hover:bg-[#5832DA] hover:bg-opacity-10 hover:text-[#5832DA]"
              onClick={() => {
                // send for check if chat available or create chat and send the payload to be set as the current chat

                getOrCreateChat(item);
              }}
              key={item.id}
            >
              <div className="flex w-full p-2 items-start gap-4">
                <Avatar
                  size={50}
                  className="grid place-items-center rounded-[74px] bg-purple-500"
                >
                  {initial}
                </Avatar>
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
                      2
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
