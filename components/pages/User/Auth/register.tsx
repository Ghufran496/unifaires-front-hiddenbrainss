"use client";
import Container from "@/components/shared/container";
import { Row, Col, Button, Card, Form, Input, Typography, Space } from "antd";
import logo from "@/public/images/purple-logo.svg";
import Image from "next/image";
import PublicLayout from "@/components/layouts/Public";

const Register = () => {
  const { Title, Paragraph, Link } = Typography;

  const onFinish = async (val: any) => {
    console.log(val, "new values");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <PublicLayout>
      <Container className="xl:px-96 px-5 xl:py-20 py-5">
        <Card className="shadow-4xl xl:px-5 rounded-xl text-center">
          <Image src={logo} alt="logo" width={150} />
          <Title level={4} className="text-center py-2 text-purple-50">
            Sign Up
          </Title>
          <Paragraph className="text-gray-500 text-xs">
            Please enter your new password below to complete account
            registration.
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
                  <Input placeholder="ayodddd@yahoo.com" size="large" />
                </Form.Item>
              </Col>

              <Col xl={24} xs={24}>
                <Form.Item
                  name="Password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="***********"
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
                  <Button type="primary" size="large" block htmlType="submit">
                    Sign Up
                  </Button>
                </Form.Item>
              </Col>
              <Typography className="text-left">
                <Paragraph className="text-gray-500 text-xs">
                  By creating an account, you agree to Unifares &nbsp;
                  <Link className="text-xs text-purple-50 " href="#">
                    Terms of Use
                  </Link>
                  &nbsp; and &nbsp;
                  <Link className="text-xs text-purple-50" href="#">
                    Privacy Policy
                  </Link>
                </Paragraph>
                <Paragraph className="text-gray-500 text-xs">
                  Already have an account? &nbsp;
                  <Link
                    className="text-xs text-purple-50 font-semibold"
                    href="/user/auth"
                  >
                    Sign In
                  </Link>
                </Paragraph>
              </Typography>
            </Row>
          </Form>
        </Card>
      </Container>
    </PublicLayout>
  );
};

export default Register;
