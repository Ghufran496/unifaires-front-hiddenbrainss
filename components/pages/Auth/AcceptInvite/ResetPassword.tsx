"use client";

import { Row, Col, Button, Form, Input, Typography, Modal } from "antd";
import config from "@/app/utils/config";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SegmentedValue } from "antd/es/segmented";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

interface VerifyTokenProps {
  Token: string;
}

interface PasswordResetProps {
  Password: string;
  Confirm: string;
}

const ResetPassword = ({
  isTokenModalOpen,
  setIsTokenModalOpen,
  email,
  setVerifyStatus,
  setVerifyFails,
}: {
  isTokenModalOpen: boolean;
  setIsTokenModalOpen: any;
  email: any;
  setVerifyStatus: any;
  setVerifyFails: any;
}) => {
  const { Paragraph } = Typography;
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getAccountForTokenVerification = async (val: VerifyTokenProps) => {
    try {
      setLoading(true);
      const tokenstr: string = typeof val?.Token === "string" ? val.Token : "";
      setToken(tokenstr);
      const response = await fetch(
        `${config.API.API_URL}/auth/verify-user-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, token: tokenstr }),
        }
      );

      if (response.ok) {
        showSuccess("Token Verified");
        setIsTokenModalOpen(false);
        setIsPasswordResetModalOpen(true);
      }
    } catch (error) {
      handleAxiosError(error);
      setVerifyFails(true);
    } finally {
      setLoading(false);
    }
  };

  const passwordReset = async (val: PasswordResetProps) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${config.API.API_URL}/auth/reset-user-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, token, password: val?.Password }),
        }
      );
      if (response.ok) {
        showSuccess("Password Reset Successful");
        router.push("/login");
        setVerifyStatus(false);
        setIsPasswordResetModalOpen(false);
      }
    } catch (error) {
      handleAxiosError(error);
      setVerifyFails(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsTokenModalOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {/* VERIFY TOKEN MODAL STARTS */}
      <Modal open={isTokenModalOpen} onCancel={handleCancel} footer={null}>
        <Paragraph className="capitalize pt-[1rem] font-bold">
          Please provide the 6 digit token sent to your email
        </Paragraph>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={getAccountForTokenVerification}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={[8, 4]}>
            <Col xl={24} sm={24} xs={24} className="pt-5">
              <Form.Item
                name="Token"
                label="6-Digit Token"
                rules={[
                  {
                    required: true,
                    message:
                      "Please provide the 6 digit token sent to your email for verification",
                  },
                  {
                    len: 6,
                    message: "Token must me a 6-Digit character",
                  },
                ]}
              >
                <Input placeholder="000000" size="large" />
              </Form.Item>
            </Col>
            <Col xl={24} xs={24} className="text-base font-semibold">
              <Form.Item>
                <Button
                  className="text-base font-bold"
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={loading}
                >
                  Verify Token
                </Button>
              </Form.Item>
            </Col>
            <Col
              xl={24}
              xs={24}
              className="text-center text-base font-semibold"
            ></Col>
          </Row>
        </Form>
      </Modal>
      {/* VERIFY TOKEN MODAL ENDS */}

      {/* RESET PASSWORD MODAL STARTS */}
      <Modal
        open={isPasswordResetModalOpen}
        onCancel={() => setIsPasswordResetModalOpen(false)}
        footer={null}
      >
        <Paragraph className="capitalize pt-[1rem] pb-[1.5rem] font-bold">
          Please reset your password here
        </Paragraph>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={passwordReset}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          {/* <Row gutter={[4, 4]}> */}
          <Col>
            <Form.Item
              name="Password"
              label="Password"
              rules={[
                {
                  required: true,
                  message:
                    "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
                  pattern: new RegExp(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/
                  ),
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Password"
                className="rounded-md"
                size="large"
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="Confirm"
              label="Confirm Password"
              dependencies={["Password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("Password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder=" Confrim Password"
                className="rounded-md"
                size="large"
              />
            </Form.Item>
          </Col>
          {/* </Row> */}
          <Col xl={24} xs={24} className="text-base font-semibold">
            <Form.Item>
              <Button
                className="text-base font-bold"
                type="primary"
                size="large"
                block
                htmlType="submit"
                loading={loading}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Modal>
      {/* RESET PASSWORD MODAL ENDS */}
    </div>
  );
};

export default ResetPassword;
