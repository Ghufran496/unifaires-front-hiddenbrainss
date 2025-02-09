"use client";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { Form, Row, Col, Button, Input, Select } from "antd";
import { useState } from "react";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const onContactFinish = async (val: any) => {
    const requestBody = val;
    try {
      setLoading(true);
      const res = await axiosInstance.post("/help", requestBody);
      if (res.status) {
        showSuccess("Ticket Submitted, Check Email for Update");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onContactFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      size="large"
    >
      <Row gutter={[16, 4]}>
        <Col xl={8} sm={24} xs={24}>
          <Form.Item
            name="category"
            label="Category"
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
        </Col>
        <Col xl={8} sm={24} xs={24}>
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
        </Col>
        <Col xl={8} sm={24} xs={24}>
          <Form.Item
            name="severity"
            label="Severity"
            rules={[
              {
                required: true,
                message: "Select Severity",
              },
            ]}
          >
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
        </Col>
        {/* <Col xl={8} sm={24} xs={24}>
          <Form.Item name="firstname" label="First Name">
            <Input placeholder="First Name" required />
          </Form.Item>
        </Col>

        <Col xl={8} sm={24} xs={24}>
          <Form.Item name="lastname" label="Last Name">
            <Input placeholder="Last Name" required />
          </Form.Item>
        </Col> */}

        <Col xl={8} sm={24} xs={24}>
          <Form.Item name="email" label="Email Address">
            <Input placeholder="Email Address" type="email" required />
          </Form.Item>
        </Col>

        <Col xl={24} sm={24} xs={24}>
          <Form.Item name="description" label="Message">
            <Input.TextArea
              placeholder="Write your messages in here"
              required
              style={{ minHeight: 200 }}
            />
          </Form.Item>
        </Col>

        <Col xl={24} className="text-center">
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="rounded-md"
              loading={loading}
            >
              Send Messages
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ContactForm;
