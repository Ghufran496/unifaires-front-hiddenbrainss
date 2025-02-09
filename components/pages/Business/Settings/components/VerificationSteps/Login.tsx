"use client";
import { Typography, Space, Card, Form, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Link from "next/link";

const LoginStep = () => {
  const { Title, Text, Paragraph } = Typography;
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <Card className="flex flex-col py-6 w-1/2 px-8 mx-auto text-center mt-16 mb-8 shadow-[0px_4px_24px_rgba(52,52,52,0.1)]">
        <Title level={5} className="text-purple-50 my-4">
          Welcome
        </Title>
        <Space direction="vertical">
          <Title level={5} className="text-sm leading-none mb-0">
            Samuel Doe{" "}
            <span className="text-purple-50 italic font-normal">
              (personal account)
            </span>
          </Title>
          <Text className="text-gray-400 ">samueldoe@gmail.com</Text>
        </Space>
        <Paragraph className="text-lg font-semibold my-6">
          To continue, first verify it&apos;s you
        </Paragraph>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="password"
            label="Enter your password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Link
            href="/business/settings/reset-password"
            passHref
            legacyBehavior
            className="text-purple-50"
          >
            Forgot password?
          </Link>

          {/* <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="my-6"
            >
              Next
            </Button>
          </Form.Item> */}
        </Form>
      </Card>
    </div>
  );
};

export default LoginStep;
