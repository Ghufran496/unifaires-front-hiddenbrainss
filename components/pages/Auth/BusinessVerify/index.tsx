"use client";

import Container from "@/components/shared/container";
import { Row, Col, Button, Card, Form, Input, Typography } from "antd";
import logo from "@/public/images/logo 224.png";
import Image from "next/image";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const VerifyPage = () => {
  const router = useRouter();
  const { Title, Paragraph } = Typography;
  const [loading, setLoading] = useState(false);

  const onFinish = async (val: any) => {
    // console.log(val, "new values");
    try {
      setLoading(true);

      const res = await axiosInstance.post(
        "/auth/resend-business-email-verification",
        {
          email: val.email,
        }
      );
      if (res.status) {
        toast.success("Verification Link sent to Email");
        router.push("/login");
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
    <div>
      <Container className="xl:px-96 px-5 xl:py-20 py-5">
        <Card className="shadow-4xl xl:px-5 rounded-xl text-center">
          <div className="flex justify-center my-4">
            <Image src={logo} alt="logo" width={150} />
          </div>
          <Title level={4} className="text-center pt-2">
            Resend Email Verification Link
            {/* Verify it’s you */}
          </Title>
          <Paragraph className="m-0">
            Please enter the email use registered with
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
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="example@gmail.com" size="large" />
                </Form.Item>
              </Col>

              <Col xl={24} xs={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    className="rounded-[4px]"
                    loading={loading}
                  >
                    Reset Link
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default VerifyPage;
