"use client";
import { Fragment, useEffect, useState } from "react";
import Container from "@/components/shared/container";
import NextLink from "next/link";
import {
  Avatar,
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Tabs,
  TabsProps,
  Typography,
  Upload,
  UploadProps,
  message,
} from "antd";
import {
  PlusOutlined,
  SendOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";

import { uploadToAPI } from "@/app/utils/mediaUpload";
import {
  handleAxiosError,
  showError,
  showSuccess,
} from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUserRole } from "@/redux/features/UserSlice";
import { RootState } from "@/redux/store";

const TrackSupports = () => {
  const [form] = Form.useForm();
  const dispatch: any = useAppDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const userId = session?.user.id;
  const ticketId = params.ticketId;
  const [loading, setLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState<any>();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const fetchTicketChats = async () => {
    // const requestBody = val;
    try {
      const res = await axiosInstance.get(`/help-chat/ticket-chat/${ticketId}`);
      if (res.status) {
        console.log("here is the chat response", res);
        const resData = res.data.data;
        setCurrentChat(resData.chats);
      }
    } catch (error) {
      console.log("unable to fetch chat", error);
      // handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchTicketChats();
    dispatch(fetchUserRole());
  }, [ticketId]);

  const userType = useAppSelector((state: RootState) => state.user.userRole);
  console.log("here is the user type", userType);

  async function SendMessage(val: any) {
    let requestBody = {
      ticketId: `${ticketId}`,
      ...val,
    };
    if (session) {
      if (userType === "user") {
        requestBody.userId = userId;
      } else if (userType === "business") {
        requestBody.businessId = userId;
      }
    } else {
      requestBody.email = currentChat[0].help.email;
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/help-chat/create-user-chat",
        requestBody
      );

      if (res.status) {
        // console.log("here is the res", res);
        form.resetFields();
        fetchTicketChats();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (timestamp: any) => {
    return moment(timestamp).format("h:mm A");
  };

  return (
    <Fragment>
      <div className="flex lg:gap-16 lg:flex-row flex-col gap-2 mt-4">
        <div className="border border-black p-6 mt-6 rounded-md">
          <Typography.Title level={4} className="font-bold">
            Tracking Support Ticket
          </Typography.Title>
          <Typography.Paragraph>
            You will get any update related to your ticket on this page, please
            provid all the informations necessary to help you resolve the issues
            you may be facing. Thank you!
          </Typography.Paragraph>
          <div className="flex lg:gap-16 lg:flex-row flex-col gap-2 mt-4">
            <div className="border border-black p-6 mt-6 rounded-md w-full">
              <div className="py-2 px-3 bg-purple-700 rounded-t-md border-b flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="flex-shrink-0 h-10 w-10  grid place-items-center rounded-full bg-purple-500">
                    <UserOutlined />
                  </Avatar>
                  <div className="ml-4">
                    <Typography.Title level={5} className="mb-0 text-white">
                      {session
                        ? session?.user.firstname
                        : currentChat && currentChat[0].help.email}
                    </Typography.Title>
                    <Typography.Text className="text-grey-darker text-xs mt-1 text-white">
                      {session && session?.user.email}
                    </Typography.Text>
                  </div>
                </div>
              </div>
              {/* <Spin
            spinning={loadingChat}
            indicator={
              <LoadingOutlined className="text-4xl flex items-center justify-center" />
            }
          > */}
              <div className="flex-1 min-h-[150px] max-h-[calc(100vh-130px)] flex flex-col border-l flex-grow p-4 overflow-y-scroll custom-scrollbar mb-2">
                {currentChat &&
                  currentChat.map((chat: any) => {
                    const Sender =
                      (session &&
                        session?.user.id ===
                          (chat.businessId || chat.userId)) ||
                      !chat.agentId;

                    return (
                      <div key={chat.id}>
                        {chat && Sender ? (
                          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                            <div>
                              <div className="bg-purple-500 text-white p-3 rounded-l-lg rounded-br-lg">
                                <p className="text-sm">{chat.message}</p>
                              </div>
                              <span className="text-xs text-gray-500 leading-none">
                                {formatTime(chat.timestamp)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex w-full mt-2 space-x-3 max-w-xs">
                            <div>
                              <div className="bg-grey-200 p-3 rounded-r-lg rounded-bl-lg">
                                <p className="text-sm">{chat.message}</p>
                              </div>
                              <span className="text-xs text-gray-500 leading-none">
                                {formatTime(chat.timestamp)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
              {/* </Spin> */}
              <Form
                layout="vertical"
                size="large"
                name="normal_login"
                // initialValues={{ remember: false }}
                autoComplete="off"
                onFinish={SendMessage}
                form={form}
              >
                <div className="flex gap-2 items-center w-full">
                  <Form.Item name="message" className="m-0 w-full">
                    <Input
                      placeholder="type a message "
                      className="rounded-sm"
                    />
                  </Form.Item>

                  <div className="">
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      className="flex items-center rounded-sm"
                      loading={loading}
                    >
                      Send <SendOutlined />
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TrackSupports;
