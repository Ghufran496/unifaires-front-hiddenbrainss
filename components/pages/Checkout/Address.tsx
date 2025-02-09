"use client";

import {
  Row,
  Col,
  Typography,
  Button,
  Input,
  Form,
  Checkbox,
  Select,
} from "antd";

const AddressComponent = () => {
  const { Title, Paragraph } = Typography;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { Option } = Select;

  return (
    <div>
      <section className=" xl:pr-60">
        <Title level={3} className="font-normal">
          Choose a billing address
        </Title>

        <Paragraph>
          Please select a billing address from your address book (below) or
          enter a new billing address. Don’t worry, you will only need to do
          this once for each credit card. If you contact us about your order, we
          will reference your account only by the name you provide below
        </Paragraph>

        <Title level={3} className="font-normal">
          Choose a billing address
        </Title>
        <hr />

        <Title level={5} className="font-normal pt-5">
          Ahamefula Udume Utom
        </Title>

        <Paragraph>Stormstr 17</Paragraph>
        <Paragraph>Koln, NordRhein-Westfalen 50997</Paragraph>
        <Paragraph>Germany</Paragraph>
        <Paragraph>Phone: 015216932149 </Paragraph>

        <Button type="primary" className="px-20" size="large">
          Use this address
        </Button>

        <hr className="mt-5" />

        <Title level={4} className="pt-5 ">
          Add a new address
        </Title>

        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className="xl:pr-60"
        >
          <Row gutter={32}>
            <Col xl={24} sm={24} xs={24} className="pt-5">
              <Form.Item
                name="CountryRegion "
                label="Country/Region "
                rules={[
                  {
                    required: true,
                    message: "Please select Country/Region !",
                  },
                ]}
              >
                <Select placeholder="Select Country/Region" size="large">
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xl={24} sm={24} xs={24}>
              <Form.Item
                name="FullName"
                label="Full Name (First and Last Name) "
                rules={[
                  {
                    required: true,
                    message:
                      "Please input your Full Name (First and Last Name)",
                  },
                ]}
              >
                <Input
                  placeholder="john doe "
                  className="rounded-md"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xl={24} sm={24} xs={24}>
              <Form.Item
                name="PhoneNumber"
                label="Phone Number  "
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number ",
                  },
                ]}
              >
                <Input
                  placeholder="john doe "
                  className="rounded-md"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xl={8} sm={24} xs={24}>
              <Form.Item
                name="City "
                label="City "
                rules={[
                  {
                    required: true,
                    message: "Please input your City !",
                  },
                ]}
              >
                <Input placeholder="City" size="large" />
              </Form.Item>
            </Col>

            <Col xl={8} sm={24} xs={24}>
              <Form.Item
                name="State "
                label="State "
                rules={[
                  {
                    required: true,
                    message: "Please select State !",
                  },
                ]}
              >
                <Select placeholder="Select Country/Region" size="large">
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xl={8} sm={24} xs={24}>
              <Form.Item
                name="ZipCode "
                label="Zip Code  "
                rules={[
                  {
                    required: true,
                    message: "Please input your Zip Code !",
                  },
                ]}
              >
                <Input placeholder="Zip Code " size="large" />
              </Form.Item>
            </Col>

            <Col xl={24} sm={24} xs={24}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Make this my default address</Checkbox>
              </Form.Item>
            </Col>

            <Col xl={24} sm={24} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Choose one Skill",
                  },
                ]}
              >
                <Button type="primary" size="large">
                  Use this address
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </section>
    </div>
  );
};

export default AddressComponent;
