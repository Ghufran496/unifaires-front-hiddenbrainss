"use client";
import Container from "@/components/shared/container";
import { Row, Col, Button, Card, Form, Input, Typography } from "antd";
import logo from "@/public/images/logo 224.png";
import Image from "next/image";
import PublicLayout from "@/components/layouts/Public";

const ForgotPassword = () => {
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
          <Image src={logo} alt="logo" width={200} height={58} />
          <Title level={4} className="text-center py-2 text-purple-50">
            Forgot Password
          </Title>
          <Paragraph className="text-gray-500 text-xs text-left">
            Enter the email address you signed up with and we&apos;ll send an
            email with instructions to reset your password.
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
                  <Input.Password
                    placeholder="ayodddd@yahoo.com"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={24} xs={24}>
                <Form.Item>
                  <Button type="primary" size="large" block htmlType="submit">
                    Send reset link
                  </Button>
                </Form.Item>
              </Col>

              <Col xl={24} xs={24} className="text-center">
                <Paragraph className="text-gray-500 text-xs text-left">
                  Remember your password?
                  <Link
                    href="/user/auth"
                    className="text-purple-50 pl-2 text-xs"
                  >
                    Login here
                  </Link>
                </Paragraph>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </PublicLayout>
  );
};

export default ForgotPassword;
