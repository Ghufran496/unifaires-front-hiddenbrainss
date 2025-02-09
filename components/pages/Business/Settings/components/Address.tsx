"use client";
import {
  Card,
  Typography,
  Space,
  Switch,
  Form,
  Select,
  Button,
  Input,
  Modal,
} from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import styles from "./Notifications.module.css";

const Address: React.FC = () => {
  const { Title, Text } = Typography;
  const cardInfo = [
    {
      id: "1",
      card_title: "Default",
      name: "Samel Jake",
      address: " Stormstr 12, NordRhein-Westfalen",
      postal_code: "5738",
      location: "Germany",
      phone_number: "09826427482",
      billing_info: " Default legal billing address",
      showSwithchBtn: false,
    },
    {
      id: "2",
      card_title: "",
      name: "Samel Jake",
      address: " Stormstr 12, NordRhein-Westfalen",
      postal_code: "5738",
      location: "Germany",
      phone_number: "09826427482",
      billing_info: "Use as the current shipping address",
      showSwithchBtn: true,
    },
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const options = [
    {
      value: "Telegram",
      label: "Telegram",
    },
    {
      value: "LinkedIn",
      disabled: true,
      label: "LinkedIn",
    },
    {
      value: "WhatsApp",
      label: "WhatsApp",
    },
    {
      value: "Facebook",
      disabled: true,
      label: "Facebook",
    },
  ];

  const { confirm } = Modal;

  const showConfirmDelete = () => {
    confirm({
      title: "Your Address",
      content: "This removes your address from your address book.",
      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          });
        } catch {
          return console.log("Oops errors!");
        }
      },
      onCancel() {},
    });
  };

  return (
    <div>
      {cardInfo.map((details) => (
        <Card
          type="inner"
          title={details.card_title || "  "}
          className="sm:w-1/2 my-6"
          key={details.id}
        >
          <Title level={5} className="text-sm">
            {details.name}
          </Title>
          <Typography>
            <Text className="block">
              {details.address} &nbsp; {details.postal_code}
            </Text>
            <Text className="block">{details.location}</Text>
            <Text className="block">Phone Number: {details.phone_number}</Text>
          </Typography>
          <Space className="mt-4 flex-wrap">
            <Text className="text-purple-50 text-sm cursor-pointer">Edit</Text>|
            <Text
              className="text-red-600 text-sm cursor-pointer"
              onClick={showConfirmDelete}
            >
              Remove
            </Text>
            |
            <Text className="text-gray-500 italic text-sm">
              {details.billing_info}
            </Text>
            &nbsp;
            {details.showSwithchBtn && <Switch className={styles.button} />}
          </Space>
        </Card>
      ))}
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 16 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "first"]}
                    rules={[{ required: true, message: "Missing first name" }]}
                  >
                    <Select
                      defaultValue="Facebook"
                      style={{ width: 120 }}
                      onChange={handleChange}
                      options={options}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "last"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Input placeholder="link" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add()}
                  // block
                  className="text-purple-50 mt-8 bg-transparent p-6 pb-12 rounded-lg w-1/2 border-dashed border-2 border-inherit"
                  icon={<PlusCircleOutlined />}
                >
                  Add Address
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Space className="">
          <Form.Item>
            <Button htmlType="button">Undo</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

export default Address;
