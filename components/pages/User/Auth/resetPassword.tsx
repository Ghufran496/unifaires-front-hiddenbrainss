"use client";
import Container from "@/components/shared/container";
import { Row, Col, Button, Card, Form, Input, Typography } from "antd";
import logo from "@/public/images/purple-logo.svg";
import Image from "next/image";
import PublicLayout from "@/components/layouts/Public";

const ResetPassword = () => {
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
            Reset Password
          </Title>
          <Paragraph className="text-gray-500 text-xs text-left">
            Enter a new password for here, and try to remember this one will you
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
                  name="NewPassword"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="New Password" size="large" />
                </Form.Item>
              </Col>

              <Col xl={24} xs={24}>
                <Form.Item
                  name="ConfirmPassword"
                  label="Confirm Password"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm password",
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
                  <Button type="primary" size="large" block htmlType="submit">
                    Update
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </PublicLayout>
  );
};

export default ResetPassword;
