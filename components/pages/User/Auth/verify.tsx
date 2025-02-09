"use client";
import Container from "@/components/shared/container";
import { Row, Col, Button, Card, Form, Input, Typography } from "antd";
import logo from "@/public/images/purple-logo.svg";
import Image from "next/image";
import PublicLayout from "@/components/layouts/Public";

const Verify = () => {
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
            Verify it&apos;s you
          </Title>
          <Paragraph className="text-gray-500 text-left">
            Please enter the pass code sent to ayodddd@yahoo.com
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
                  label="Code"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Code!",
                    },
                  ]}
                >
                  <Input placeholder="AU-5461-323" size="large" />
                </Form.Item>
              </Col>

              <Col xl={24} xs={24}>
                <Form.Item>
                  <Button type="primary" size="large" block htmlType="submit">
                    Verify
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            <Paragraph className="text-gray-500  text-left">
              Already have an account?&nbsp;
              <Link className="text-purple-50 font-semibold" href="/user/auth">
                Sign In
              </Link>
            </Paragraph>
          </Form>
        </Card>
      </Container>
    </PublicLayout>
  );
};

export default Verify;
