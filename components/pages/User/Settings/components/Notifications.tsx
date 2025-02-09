"use client";
import { Divider, Space, Switch, Typography } from "antd";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const { Title, Text } = Typography;

  return (
    <div className="sm:full sm:h-[40%] lg:w-2/3 px-6 pt-5">
      <Space className="justify-between items-start flex my-6">
        <Title level={5} className="text-sm">
          Get All Notifications
        </Title>
        <Switch defaultChecked className={styles.button} />
      </Space>
      <Title level={5} className="text-md">
        Education & Career Growth
      </Title>
      <Divider className="mt-0" />
      <Space className="justify-between items-start flex my-6">
        <Typography>
          <Title level={5} className="text-sm leading-none">
            Get All Notifications
          </Title>
        </Typography>
        <Switch className={styles.button} />
      </Space>
      <Space className="justify-between items-start flex my-6">
        <Typography>
          <Title level={5} className="text-sm leading-none">
            Profile matching jobs
          </Title>
          <Text className="text-gray-400">
            Job alerts that match your profile
          </Text>
        </Typography>
        <Switch className={styles.button} />
      </Space>
      <Space className="justify-between items-start flex my-6">
        <Typography>
          <Title level={5} className="text-sm leading-none">
            Profile matching courses
          </Title>
          <Text className="text-gray-400">
            Course alerts that match your profile
          </Text>
        </Typography>
        <Switch className={styles.button} />
      </Space>
      <Space className="justify-between items-start flex my-6">
        <Typography>
          <Title level={5} className="text-sm leading-none">
            Profile matching funding, grants, and scholarships
          </Title>
          <Text className="text-gray-400">
            Course alerts that match your profile
          </Text>
        </Typography>
        <Switch className={styles.button} />
      </Space>
      <Space className="justify-between items-start flex my-6">
        <Typography>
          <Title level={5} className="text-sm leading-none">
            Profile matching courses
          </Title>
          <Text className="text-gray-400">
            Near-complete alerts (up to 95%) for courses that you learn
          </Text>
        </Typography>
        <Switch className={styles.button} />
      </Space>
    </div>
  );
};

export default Notifications;
