"use client";
import { Typography, Space, Card, Switch, Divider } from "antd";
import Link from "next/link";
import styles from "./Notifications.module.css";

const Privacy = () => {
  const { Title, Text } = Typography;
  return (
    <div className="sm:px-2 lg:px-6">
      <Space className="my-4" direction="vertical">
        <Title level={5} className="text-sm mb-0 leading-none">
          Profile Visibility
        </Title>
        <Text className="text-gray-400 mt-0">
          Adjust these settings to control where you and your badges can be
          discovered.
        </Text>
      </Space>
      <Card className="sm:w-full lg:w-2/3 my-6">
        <Space className="justify-between items-start flex my-6">
          <Text className="text-sm">
            Allow my profile to be publicly visible
          </Text>
          <Switch defaultChecked className={styles.button} />
        </Space>
        <Space className="justify-between items-start flex my-6">
          <Text className="text-sm">
            Allow users to contact me using my public profile
          </Text>
          <Switch className={styles.button} />
        </Space>
        <Space className="justify-between items-start flex my-6">
          <Text className="text-sm">
            Allow my profile to be included in searching directories
          </Text>
          <Switch className={styles.button} />
        </Space>
      </Card>
      <Space className="my-6" direction="vertical">
        <Title level={5} className="text-sm mb-0 leading-none">
          Two-Factor Authentication
        </Title>
        <Text className="text-gray-400 mt-0">
          Two-Factor authentication improves the security of your account. After
          you turn it on, signing into your account will require you to enter a
          code created by the authenticator application on your mobile device.
        </Text>
      </Space>
      <Space className="my-4 flex justify-between">
        <Title level={5} className="text-sm mb-0 leading-none">
          2-Step verification &nbsp;&nbsp;
          <Switch className={styles.button} />
        </Title>
        <Link href="/business/settings/privacy/verification">
          <Text className="text-purple-50 cursor-pointer">Setup &gt;</Text>
        </Link>
      </Space>
      <Divider className="mt-0" />
    </div>
  );
};

export default Privacy;
