"use client";
import Container from "@/components/shared/container";
import {
  Row,
  Col,
  Button,
  Card,
  Form,
  Input,
  Typography,
  Modal,
  Segmented,
} from "antd";
import logo from "@/public/images/logo 224.png";
import Image from "next/image";
import config from "@/app/utils/config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SegmentedValue } from "antd/es/segmented";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

interface ResetPasswordEmailProps {
  Email: string;
}

interface VerifyTokenProps {
  Token: string;
}

interface PasswordResetProps {
  Password: string;
  Confirm: string;
}

const ForgotPasswordPage = () => {
  const { Title, Paragraph, Link } = Typography;
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isSuccessAlertModalOpen, setIsSuccessAlertModalOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState<SegmentedValue>("Personal");
  const router = useRouter();

  // GET PASSWORD RESET TOKEN FUNCTINS STARTS
  const onFinish = async (val: ResetPasswordEmailProps) => {
    const accountTypeEndpoints = [
      `${config.API.API_URL}/auth/reset-user-token`,
      `${config.API.API_URL}/auth/reset-business-token`,
    ];
    if (accountType === "Personal") {
      getPasswordResetToken(accountTypeEndpoints[0], val.Email);
    } else {
      getPasswordResetToken(accountTypeEndpoints[1], val.Email);
    }
  };

  async function getPasswordResetToken(endpoint: string, val: string) {
    // console.log(endpoint, val);
    try {
      setLoading(true);
      const response = await axiosInstance.post(endpoint, { email: val });

      if (response.status) {
        setIsTokenModalOpen(true);
        setEmail(val);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }
  // GET PASSWORD RESET TOKEN FUNCTINS ENDS

  // TOKEN VARIFICATION FUNCTIONS STARTS
  const verifyToken = (val: VerifyTokenProps) => {
    const accountTypeEndpoints = [
      `${config.API.API_URL}/auth/verify-user-token`,
      `${config.API.API_URL}/auth/verify-business-token`,
    ];
    if (accountType === "Personal") {
      getAccountForTokenVerification(accountTypeEndpoints[0], val.Token);
    } else {
      getAccountForTokenVerification(accountTypeEndpoints[1], val.Token);
    }
  };

  const getAccountForTokenVerification = async (
    endpoint: string,
    val: string
  ) => {
    try {
      setLoading(true);
      setToken(val);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token: val }),
      });

      if (response.ok) {
        showSuccess("Token Verified");
        setIsTokenModalOpen(false);
        setIsPasswordResetModalOpen(true);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };
  // TOKEN VARIFICATION FUNCTIONS ENDS

  // PASSWORD RESET FUNCTIONS STARTS
  const handlePasswordReset = (val: PasswordResetProps) => {
    const accountTypeEndpoints = [
      `${config.API.API_URL}/auth/reset-user-password`,
      `${config.API.API_URL}/auth/reset-business-password`,
    ];
    if (accountType === "Personal") {
      passwordReset(accountTypeEndpoints[0], val.Password);
    } else {
      passwordReset(accountTypeEndpoints[1], val.Password);
    }
  };

  const passwordReset = async (endpoint: string, val: string) => {
    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token, password: val }),
      });
      if (response.ok) {
        showSuccess("Password Reset Successful");
        router.push("/login");
        setIsPasswordResetModalOpen(false);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };
  // PASSWORD RESET FUNCTIONS ENDS

  const handleCancel = () => {
    // setIsEmailModalOpen(false);
    setIsTokenModalOpen(false);
  };

  function handleAccountTypeChange(value: SegmentedValue) {
    setAccountType(value);
  }

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
          onFinish={verifyToken}
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
          onFinish={handlePasswordReset}
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

      <Container className="xl:px-96 px-5 xl:py-20 py-5 items-center">
        <Card className="shadow-4xl xl:px-5 mt-10 rounded-xl text-center">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" width={200} height={58} />
          </div>
          <Title level={4} className="text-center text-[32px] font-bold py-2">
            Forgot Password
          </Title>
          <Paragraph className="font-normal italic text-gray-600">
            Enter the email address you signed up with and we&apos;ll send an
            email with instructions to reset your password.{" "}
          </Paragraph>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[8, 4]}>
              <Col
                xl={24}
                sm={24}
                xs={24}
                className="pt-5 flex flex-col mb-2 mt-[0.3rem] justify-center items-center"
              >
                <Paragraph>Please select an account type</Paragraph>
                <Segmented
                  options={["Personal", "Business"]}
                  size="large"
                  onChange={handleAccountTypeChange}
                />
              </Col>
              <Col xl={24} sm={24} xs={24} className="pt-5">
                <Form.Item
                  name="Email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input placeholder="example@gmail.com" size="large" />
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
                    Send Reset Link
                  </Button>
                </Form.Item>
              </Col>

              <Col
                xl={24}
                xs={24}
                className="text-center text-base font-semibold"
              >
                <Paragraph>
                  Remember your password?
                  <span>
                    <Link href="/login" className="text-purple-50 pl-2">
                      Login here
                    </Link>
                  </span>
                </Paragraph>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
