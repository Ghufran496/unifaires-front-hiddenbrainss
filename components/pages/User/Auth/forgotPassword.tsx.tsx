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
  Spin,
  Alert,
} from "antd";
import logo from "@/public/images/purple-logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// import { LoginUser } from "../User/api";

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const { Title, Paragraph, Link } = Typography;
  const router = useRouter();

  const { data: session, status } = useSession();

  const onFinish = async (val: LoginProps) => {
    console.log(val);
    setIsLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: val.email,
      password: val.password,
      callbackUrl: "/",
    });
    if (status?.status === 200) {
      setIsLoading(false);
      console.log(status);
      // router.push("/user");
    } else {
      setLoginError(true);
      setIsLoading(false);
      console.log(status);
      // onFinishFailed("Login Failed")
      // generate error response
    }

    if (status?.ok) {
      console.log(val, "new values");
      router.push("/user");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e, "I was closed.");
    setLoginError(false);
  };

  return (
    <div>
      <Container className="px-5 py-5 xl:px-96 xl:py-20">
        <Image src={logo} alt="logo" width={150} />
        <Card className="text-center shadow-4xl xl:px-5 rounded-xl">
          <Title level={4} className="py-2 text-center">
            Login
          </Title>
          {loginError === true ? (
            <Col xl={24} xs={24} style={{ marginBottom: 10 }}>
              <Alert
                message="Account not found. Please check your details and try again."
                type="error"
                closable
                onClose={onClose}
              />
            </Col>
          ) : null}

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
                {isLoading == true ? (
                  <Spin />
                ) : (
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please Choose one Skill",
                      },
                    ]}
                  >
                    <Button type="primary" size="large" block htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                )}
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
                    <Link href="/reset" className="pl-2 text-purple-50">
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
