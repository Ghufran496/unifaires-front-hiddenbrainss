"use client";
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Typography,
} from "antd";
import { HelpInt, HelpTrackInt } from "./help.interface";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import moment from "moment";
import axiosAccessInstance from "@/app/utils/businessAccess-axios-config";

interface helpDetailsProp {
  helpDetail: HelpInt;
  fetchAssignedHelp: Function;
  fetchResolvedHelp: Function;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const HelpDetails = ({
  helpDetail,
  fetchAssignedHelp,
  fetchResolvedHelp,
  isModalOpen,
  setIsModalOpen,
}: helpDetailsProp) => {
  const { data: session, status } = useSession();
  const [form] = Form.useForm();
  const agentId = session?.user.id;
  const ticketId = helpDetail.ticketId;
  const [loading, setLoading] = useState(false);
  const [resolveLoading, setResolveLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [helpStatus, setHelpStatus] = useState<HelpTrackInt>();
  const [currentChat, setCurrentChat] = useState<any>();

  useEffect(() => {
    helpDetail.helptracks.map((helpStatus) => setHelpStatus(helpStatus));
  }, []);

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // console.log("help", helpDetail);

  const handleResolve = async () => {
    try {
      setResolveLoading(true);
      const res = await axiosAccessInstance.put(
        `/help-track/change-status/${helpDetail.id}`,
        {
          status: "resolved",
        }
      );
      if (res.status) {
        fetchAssignedHelp();
        fetchResolvedHelp();
        closeModal();
        showSuccess("Help Resolved Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setResolveLoading(false);
    }
  };

  async function fetchTicketChats() {
    try {
      setLoadingChat(true);
      const res = await axiosAccessInstance.get(`/help-chat/ticket-chat/${ticketId}`);
      if (res.status) {
        const resData = res.data.data;
        setCurrentChat(resData.chats);
      }
    } catch (error) {
      console.log("Unable to fetch ticket chat", error);
      // handleAxiosError(error);
    } finally {
      setLoadingChat(false);
    }
  }

  async function SendMessage(val: any) {
    try {
      setLoading(true);
      const res = await axiosAccessInstance.post("/help-chat/create-user-chat", {
        ticketId: `${ticketId}`,
        agentId: agentId,
        ...val,
      });

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

  useEffect(() => {
    fetchTicketChats();
  }, []);

  const formatTime = (timestamp: any) => {
    return moment(timestamp).format("h:mm A");
  };

  // console.log("helsta", helpStatus);

  return (
    <Modal
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
      footer={false}
      width={600}
    >
      <div className="flex flex-row">
        <Typography.Paragraph className="font-bold text-[1.5em] pl-6 m-0">
          Case Details
        </Typography.Paragraph>
      </div>
      {helpStatus?.status == "assigned" && (
        <div className="flex ml-auto mt-4">
          <Button
            type="default"
            size="middle"
            className="flex ml-auto"
            loading={resolveLoading}
            onClick={handleResolve}
          >
            Resolve
          </Button>
        </div>
      )}
      <div className="flex lg:gap-16 lg:flex-row flex-col gap-2 pt-1">
        <div className="border border-black p-6 mt-6 rounded-md w-full">
          <div className="py-2 px-3 bg-purple-700 rounded-t-md border-b flex flex-row justify-between items-center">
            <div className="flex items-center">
              <Avatar className="flex-shrink-0 h-10 w-10  grid place-items-center rounded-full bg-purple-500">
                <UserOutlined />
              </Avatar>
              <div className="ml-4">
                <Typography.Title level={5} className="mb-0 text-white">
                  {helpDetail.email}
                </Typography.Title>
                {/* <Typography.Text className="text-grey-darker text-xs mt-1 text-white">
                  Andrés, Tom, Harrison, Arnold, Sylvester
                </Typography.Text> */}
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
                const Sender = session?.user.id === chat.agentId;
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
            // initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={SendMessage}
            form={form}
          >
            <div className="flex gap-2 items-center w-full">
              <Form.Item
                name="message"
                className="m-0 w-full"
                rules={[
                  {
                    required: true,
                    message: "Type a message",
                  },
                ]}
              >
                <Input placeholder="type a message " className="rounded-sm" />
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
    </Modal>
  );
};

export default HelpDetails;
