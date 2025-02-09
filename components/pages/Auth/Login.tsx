/* eslint-disable react-hooks/exhaustive-deps */
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
  Segmented,
} from "antd";
import logo from "@/public/images/logo 224.png";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SegmentedValue } from "antd/es/segmented";
import axiosInstance from "@/app/utils/axios-config";
import { showError, showSuccess } from "@/app/utils/notifications";
import { WhiteLoader } from "@/app/utils/loader";

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>();
  const { Title, Paragraph, Link } = Typography;
  const router = useRouter();
  const params = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginOption, setLoginOption] =
    useState<SegmentedValue>("Personal Login");
  const { data: session, status } = useSession();
  const redirectUrl = params.get("redirect");
  const errorMsg = params.get("error");

  const onFinish = async (val: LoginProps) => {
    try {
      let response;
      setIsLoading(() => true);

      if (loginOption === "Personal Login") {
        response = await signIn("password-login", {
          redirect: true,
          email: val.email,
          password: val.password,
          callbackUrl: "/",
        });
      } else {
        response = await signIn("business-login", {
          redirect: false,
          email: val.email,
          password: val.password,
          callbackUrl: "/",
        });
      }

      if (response?.error === "Error: awaiting email verification") {
        if (loginOption === "Business Login") {
          router.push("/verify-business");
        } else {
          router.push("/verify");
        }
      }

      if (typeof response?.error === "string") {
        showError(`${response?.error}`);
        setErrorMessage(response?.error);
      } else {
        showSuccess("Login Successful. ");
      }

      setIsLoading(() => false);
    } catch (error) {
      setErrorMessage(`${error}`);
      setIsLoading(() => false);
    } finally {
      setIsLoading(() => false);
    }
  };

  async function getUserRole() {
    try {
      const res = await axiosInstance.get(`/roles/${session?.user?.roleId}`);
      const data = res.data;

      setUserType(data.data.title);
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getUserRole();
    }
  }, [session?.user]);

  const onFinishFailed = (errorInfo: any) => {};

  // this handles redirection to different dashboard based on the logged users role
  useEffect(() => {
    if (userType !== undefined && !redirectUrl) {
      if (userType == "admin") {
        router.push("/");
      } else {
        router.push(`${userType}`);
      }
    } else if (redirectUrl && status === "authenticated") {
      router.push(`${redirectUrl}`);
    }
  }, [status, userType]);

  useEffect(() => {
    if (typeof errorMsg === "string") {
      setErrorMessage(errorMsg);
    } else {
      setErrorMessage("");
    }
  }, [errorMsg]);

  const handleLoginChange = (value: SegmentedValue) => {
    setLoginOption(value);
  };

  return (
    <div>
      <Container className="px-5 py-5 xl:px-96 xl:py-20">
        <Card className="text-center shadow-4xl xl:px-5 rounded-xl">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" width={200} height={58} />
          </div>
          <Title level={4} className="py-2 text-center">
            Login
          </Title>
          {typeof errorMessage === "string" && errorMessage.trim() !== "" ? (
            <>
              <div className="text-red-600 my-2">{errorMessage}</div>
            </>
          ) : (
            <></>
          )}
          <Segmented
            options={["Personal Login", "Business Login"]}
            size="large"
            onChange={handleLoginChange}
          />

          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[8, 4]}>
              <Col xl={24} sm={24} xs={24} className="pt-5">
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" size="large" />
                </Form.Item>
              </Col>

              <Col xl={24} xs={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={24} xs={24}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please Choose one Skill",
                    },
                  ]}
                >
                  <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <WhiteLoader /> : "Login"}
                  </Button>
                </Form.Item>
              </Col>

              <Col xl={24} xs={24} className="text-center">
                <Paragraph>
                  Don’t have an account?
                  <span className="pl-2 text-purple-50">
                    <Link
                      href="/signup-individual"
                      className="pl-2 text-purple-50"
                    >
                      Sign up
                    </Link>
                  </span>
                </Paragraph>
              </Col>

              <Col xl={24} xs={24} className="text-center">
                <Paragraph>
                  Forgot your Password?
                  <span className="pl-2 text-purple-50">
                    <Link
                      href="/forgot-password"
                      className="pl-2 text-purple-50"
                    >
                      Reset it here
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

export default Login;
