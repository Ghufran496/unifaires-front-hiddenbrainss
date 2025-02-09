"use client";
import { Typography, Select, Card, Form, Input } from "antd";
import Country from "@/components/shared/CountryList/countryList";

const AddPhoneStep = () => {
  const { Option } = Select;
  const { Title, Text, Paragraph } = Typography;
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const selectBefore = (
    <Select defaultValue="+1 🇺🇸" className="select-before">
      <Option value="+1 🇺🇸">+1 🇺🇸</Option>
      <Option value="+234 🇳🇬">+234 🇳🇬</Option>
      {/* <Option value={`${list.dial_code} ${list.flag}`}>{`${list.dial_code} ${list.flag}`}</Option> */}
    </Select>
  );
  console.log(Country[0].flag);
  return (
    <div>
      <Card className="flex flex-col py-6 w-1/2 px-8 mx-auto text-center mt-16 mb-8 shadow-[0px_4px_24px_rgba(52,52,52,0.1)]">
        <Title level={5} className="text-purple-50 my-4">
          Let&apos;s set up your phone
        </Title>

        <Paragraph className="text-md font-semibold my-6">
          What phone number do you want to use?
        </Paragraph>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="phone_number"
            label="Enter your phone number"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
            ]}
          >
            <Input
              type="tel"
              size="large"
              placeholder="344 736 9000"
              addonBefore={selectBefore}
            />
          </Form.Item>

          <Text className="text-xs text-gray-500">
            A code will be sent to your phone number through text message
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

export default AddPhoneStep;
