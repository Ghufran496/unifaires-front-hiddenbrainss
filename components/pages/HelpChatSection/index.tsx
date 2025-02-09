"use client";
import React, { useState } from "react";
// antd components
import {
  Avatar,
  Button,
  Form,
  Grid,
  Input,
  Select,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import {
  SendOutlined,
  LeftOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BsCalendar2 } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import {
  handleAxiosError,
  showError,
  showSuccess,
} from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HelpChatSection = ({ setViewMessage }: any) => {
  const screens = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mediaUrl, setMediaUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleChange: UploadProps["onChange"] = async (info) => {
    // setLoading(true);

    const { status } = info.file;

    if (status === "uploading") {
      // check if it already sent
      if (!isUploading) {
        const uploadedFile = info.file.originFileObj;

        if (uploadedFile) {
          // check if is alrady set don't set
          setIsUploading(true);
          uploadToAPI(uploadedFile).then((res) => {
            setMediaUrl(res);
            // setLoading(false);
            setIsUploading(false);
          });
        }
      }
    } else if (status === "error") {
      showError(`${info.file.name} file upload failed.`);
      // setLoading(false)
    }
  };

  const onFinish = async (val: any) => {
    const requestBody = val;
    try {
      setLoading(true);
      const res = await axiosInstance.post("/help", requestBody);
      if (res.status) {
        showSuccess("Ticket Submitted, Check Email for Update");
        form.resetFields();
        setViewMessage(false);
        // router.push("/tickets");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[400px] flex flex-col h-full bg-gray-200 rounded-md ml-6">
      <div className="py-2 px-3 bg-purple-700 border-b flex gap-[50px] flex-grow flex-row justify-center items-center rounded-t-md">
        <div className="flex gap-3 items-center">
          {(screens.xs || (screens.sm && !screens.md)) && (
            <Button
              type="text"
              icon={<LeftOutlined className="font-bold text-xl text-white" />}
              onClick={() => setViewMessage(false)}
            />
          )}

          <div className="flex justify-center">
            <Typography.Title
              level={3}
              className="w-full font-semibold  py-3 text-white text-xl md:text-lg md:font-bold m-0  "
            >
              Unifaires Support
            </Typography.Title>
          </div>
        </div>
      </div>
      <div className="custom-scrollbar flex flex-col flex-grow p-4 overflow-auto">
        {session && (
          <Link href="/tickets" className="flex ml-auto ">
            <Typography.Paragraph
              onClick={() => setViewMessage(false)}
              className="m-0 cursor-pointer font-bold text-base hover:underline text-purple-400"
            >
              Track Tickets
            </Typography.Paragraph>
          </Link>
        )}
        <div className="border border-black p-6 mt-6 rounded-md">
          <Typography.Title level={4} className="font-bold">
            Create a New Support Ticket
          </Typography.Title>
          <Typography.Paragraph>
            Please help us route your question to the relevant team by choosing
            a topic. For a faster resolution, you can search our{" "}
            <span className="text-blue-700">Product Documentation</span>
          </Typography.Paragraph>
          <Form
            layout="vertical"
            size="large"
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select the category of your ticket",
                },
              ]}
            >
              <Select
                defaultValue="Select Service"
                options={[
                  {
                    label: "Billing",
                    value: "billing",
                  },
                  {
                    label: "Subscription",
                    value: "subscription",
                  },
                  {
                    label: "Course",
                    value: "course",
                  },
                  {
                    label: "Jobs",
                    value: "jobs",
                  },
                  {
                    label: "Funding",
                    value: "funding",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Subject"
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Please write a subject for your ticket",
                },
              ]}
            >
              <Input placeholder=" Ticket Issue - This is just a test" />
            </Form.Item>
            <Form.Item name="severity">
              <Select
                defaultValue="Select Severity"
                options={[
                  {
                    label: "High",
                    value: "high",
                  },
                  {
                    label: "Medium",
                    value: "medium",
                  },
                  {
                    label: "Low",
                    value: "low",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Enter your email",
                },
              ]}
            >
              <Input placeholder=" example@gmail.com " />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Briefly describe  your ticket",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder=" Ticket Issue Description - I was trying to... "
              />
            </Form.Item>

            <div>
              <Upload onChange={handleChange} listType="picture">
                <Button
                  type="default"
                  className="border border-dashed w-full rounded-md font-semibold bg-gray-100"
                >
                  Add Attachment or drop files here{" "}
                </Button>
              </Upload>
            </div>
            <div className="mt-6">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full rounded-sm"
                loading={loading}
              >
                Submit Ticket
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className=" bg-purple-700 border-b flex gap-[50px] flex-grow flex-row justify-center items-center rounded-b-md">
        <div className="flex justify-center">
          <Typography.Title
            level={3}
            className="w-full font-semibold  py-3 text-white text-xl md:text-lg md:font-bold m-0  "
          >
            Unifaires Support
          </Typography.Title>
        </div>
      </div>
    </div>
  );
};

export default HelpChatSection;
