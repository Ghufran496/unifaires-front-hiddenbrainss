"use client";

import { Fragment, useState } from "react";
import Container from "@/components/shared/container";
import NextLink from "next/link";
import {
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
import { useSession } from "next-auth/react";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import {
  handleAxiosError,
  showError,
  showSuccess,
} from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";

const CreateTicket = ({ fetchPendingTickets }: any) => {
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
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
        fetchPendingTickets();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="flex lg:gap-16 lg:flex-row flex-col gap-2 mt-4">
        <div className="lg:w-1/2">
          <section className="content-header mb-6">
            <Breadcrumb
              separator=">"
              className="cursor-pointer"
              items={[
                { title: "Unifaires Support" },
                { title: "Create Tickets" },
              ]}
            />
          </section>
          <Typography.Title level={2} className="font-bold">
            Create Tickets
          </Typography.Title>
          <Typography.Paragraph>
            Follow this 3 steps to help resolve your ticket:
          </Typography.Paragraph>
          <ol className="list-decimal pl-8 leading-6">
            <li>
              Search the Help Center for solutions. You may be able to solve an
              issue without having to wait for an answer.
            </li>
            <li>
              Select the team or account where you need help in the upper right.
              This give your support agent the context to help you better.
            </li>
            <li>
              Include key details and provide steps to reproduce the problem.
              this helps us troubleshoot your issue faster.
            </li>
          </ol>
        </div>

        <div className="border border-black p-6 mt-6 rounded-md">
          <Typography.Title level={4} className="font-bold">
            Create a New Support Ticket
          </Typography.Title>
          <Typography.Paragraph>
            Please help us `route` your question to the relevant team by
            choosing a topic. For a faster resolution, you can search our{" "}
            <span className="text-blue-700">Product Documentation</span>
          </Typography.Paragraph>
          <Form
            layout="vertical"
            size="large"
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
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
                className="rounded-sm"
                loading={loading}
              >
                Submit Ticket
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateTicket;
