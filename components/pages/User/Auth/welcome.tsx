"use client";
import Container from "@/components/shared/container";
import { Row, Col, Button, Card, Form, Input, Typography, Space } from "antd";
import logo from "@/public/images/purple-logo.svg";
import Image from "next/image";
import PublicLayout from "@/components/layouts/Public";

const Welcome = () => {
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
            Welcome
          </Title>
          <Paragraph className="text-gray-500 text-left">
            Enter your email address to create account.
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
                  name="Code"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email address",
                    },
                  ]}
                >
                  <Input placeholder="ayodddd@yahoo.com" size="large" />
                </Form.Item>
              </Col>

              <Col xl={24} xs={24}>
                <Form.Item>
                  <Button type="primary" size="large" block htmlType="submit">
                    Proceed
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            <Space dir="horizontal" className="justify-between w-full">
              <Paragraph className="text-gray-500 text-xs text-left">
                Need help? Please call&nbsp;
                <Link className="text-gray-500 font-semibold text-xs">
                  +4323211986367
                </Link>
              </Paragraph>
              <Paragraph className="text-purple-50 font-semibold">
                Sign In
              </Paragraph>
            </Space>
          </Form>
        </Card>
      </Container>
    </PublicLayout>
  );
};

export default Welcome;
