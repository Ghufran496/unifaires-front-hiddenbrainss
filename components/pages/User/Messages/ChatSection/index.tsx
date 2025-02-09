"use client";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Stack } from "@mui/material";
import { Avatar, Button, Grid, Typography } from "antd";
import { SendOutlined, LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/utils/axios-config";
import { socket } from "@/app/utils/socket";
import {
  addToMessage,
  updateChatNotification,
} from "@/redux/features/messages/chatsSlices";

const ChatSection = () => {
  const screens = Grid.useBreakpoint();
  const currentChat = useAppSelector((state: any) => state.chat.currentChat);
  const [chatText, setChatText] = useState("");
  const [name, setName] = useState("");
  const [initial, setInitials] = useState("");
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentChat) {
      const model = currentChat.model.toLowerCase();
      const name =
        model === "user"
          ? `${currentChat.firstname} ${currentChat.lastname}`
          : currentChat.companyName;

      const initialName =
        model === "user"
          ? `${currentChat.firstname ? currentChat.firstname[0] : ""}` +
            `${currentChat.lastname ? currentChat.lastname[0] : ""}`
          : currentChat.companyName
          ? currentChat.companyName[0]
          : "";
      setName(() => name);
      setInitials(() => initialName);
    }
  }, [currentChat]);

  useEffect(() => {}, [currentChat]);

  useEffect(() => {
    socket.on("receiveMessage", (chat) => {
      if (currentChat.chatId === chat.chatId) {
        dispatch(addToMessage({ chat }));
      }
    });

    // receive notification
    socket.on("notification", (notification) => {
      console.log("Received notification", notification);

      if (notification.chatId === currentChat.chatId) {
        // If the notification is for the current chat, mark it as read
        console.log(notification.chatId, "noti", currentChat, "curren chat");

        console.log("chat currently open");
        socket.emit("notificationRead", {
          chatId: notification.chatId,
          receiverId: notification.receiverId,
        });
      } else {
        console.log("need to be dispatch");
        // Update the notifications count for the relevant chat
        dispatch(updateChatNotification(notification));
      }
    });
  }, [socket]);
  // send text chat

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);
  async function sendTextChat() {
    try {
      const response = await axiosInstance.post("/chat-message", {
        chatId: currentChat.chatId,
        content: chatText,
        contentType: "text",
      });

      if (response.status === 201) {
        setChatText(() => "");

        const data = response.data.data;

        const { chat, ...result } = data;

        dispatch(addToMessage({ chat: result }));
        socket.emit("sendChat", response.data.data);

        // emit the send chat
      }
    } catch (error) {}
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default Enter behavior (e.g., new line)
      sendTextChat();
    }
  };

  const formatDate = (date: string) => {
    const messageDate = new Date(date);
    const currentDate = new Date();

    // Compare the year of the message date and the current date
    const isSameYear = messageDate.getFullYear() === currentDate.getFullYear();

    // Compare the day of the message date and the current date
    const isToday = messageDate.getDate() === currentDate.getDate();
    const isYesterday =
      messageDate.getDate() === currentDate.getDate() - 1 &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear();

    if (isToday) {
      return "Today";
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      const day = format(messageDate, "EEE");
      const month = format(messageDate, "MMM");
      const dayOfMonth = format(messageDate, "d");

      let formattedDate = `${day}, ${month} ${dayOfMonth}`;

      if (!isSameYear) {
        const year = format(messageDate, "yyyy");
        formattedDate += ` ${year}`;
      }

      return formattedDate;
    }
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="py-2 px-3 bg-white border-b flex gap-[50px]  flex-row justify-between items-center h-[68px]">
        <div className="flex gap-3 items-center">
          {(screens.xs || (screens.sm && !screens.md)) && (
            <Button
              type="text"
              icon={<LeftOutlined className="font-bold text-xl" />}
              onClick={() => {}}
            />
          )}
          <Avatar
            size={50}
            className="grid place-items-center rounded-[74px] bg-purple-500"
          >
            {initial}
          </Avatar>
          <div className="ml-4">
            <Typography.Title
              level={5}
              className=" font-semibold text-xl md:text-lg md:font-bold m-0  "
            >
              {name}
            </Typography.Title>
            <Typography.Text className="text-[#808080] text-base md:text-sm font-medium">
              Active Now
            </Typography.Text>
          </div>
        </div>
      </div>

      <div className="custom-scrollbar flex flex-col flex-grow p-4 overflow-auto">
        {currentChat &&
          currentChat.chatmessages &&
          currentChat.chatmessages.map((message: any, index: number) => {
            const messageTime = new Date(message.createdAt);
            const messageDate = formatDate(message.createdAt);

            const time = format(messageTime, "h:mm a");
            const previousMessageDate =
              index > 0
                ? formatDate(currentChat.chatmessages[index - 1].createdAt)
                : null;
            const shouldDisplayDate = previousMessageDate !== messageDate;

            return (
              <Stack key={index} ref={scroll}>
                {/* Display date if it's a new day */}
                {shouldDisplayDate && (
                  <div key={`date-${index}`} className="text-center mb-2">
                    {messageDate}
                  </div>
                )}
                {message.senderId === session?.user.id ||
                message?.receiverId === session?.user.id ? (
                  <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                    <div>
                      <div className="bg-purple-500 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        {time}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full mt-2 space-x-3 max-w-xs">
                    <div>
                      <div className="bg-grey-200 p-3 rounded-r-lg rounded-bl-lg">
                        <p className="text-sm">{message.content} </p>
                      </div>
                      <span className="text-xs text-gray-500 leading-none">
                        {time}
                      </span>
                    </div>
                  </div>
                )}
              </Stack>
            );
          })}
        {/* render the chat messages  */}

        {/* Chat 2  */}
      </div>

      <div className="bg-white border-t px-4 py-4 flex items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              opacity=".45"
              fill="#263238"
              d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
            ></path>
          </svg>
        </div>
        <div className="flex-1 mx-4">
          <input
            className="w-full border rounded px-2 py-2"
            type="text"
            value={chatText}
            onChange={(e) => {
              setChatText(() => e.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="flex gap-2">
          <UploadOutlined className="text-xl hover:cursor-pointer hover:text-purple-500 font-bold" />

          <SendOutlined
            className="text-xl hover:cursor-pointer hover:text-purple-500 font-bold"
            onClick={() => {
              sendTextChat();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
