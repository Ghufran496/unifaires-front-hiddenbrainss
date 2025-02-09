"use client";
import { Typography, Card, Form, Input } from "antd";
import Link from "next/link";

const VerifyNumber = () => {
  const { Title, Text, Paragraph } = Typography;
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <Card className="flex flex-col py-6 w-1/2 px-8 mx-auto text-center mt-16 mb-8 shadow-[0px_4px_24px_rgba(52,52,52,0.1)]">
        <Title level={5} className="text-purple-50 my-4">
          Confirm that it works
        </Title>

        <Paragraph className="text-md my-6">
          Unifaires just sent a text message with a verification code to +1 344
          736 9000
        </Paragraph>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="phone_number"
            label="Enter the code"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
            ]}
          >
            <Input type="tel" size="large" placeholder="344-t566" />
          </Form.Item>

          <Text className="text-xs text-gray-500 flex justify-start">
            Didn&apos;t get it?&nbsp;
            <Link href="#">
              <span className="text-purple-50 cursor-pointer">Resend</span>
            </Link>
          </Text>

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

export default VerifyNumber;
