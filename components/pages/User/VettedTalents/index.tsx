"use client";

import Container from "@/components/shared/container";
import DashboardHeader from "@/components/shared/dashboardHeader";
import { Card, Typography, Space, Tabs } from "antd";
import TalentRequest from "./components/TalentRequest";

const VettedTalents = () => {
  const { Text, Title } = Typography;
  const onChange = (key: string) => {
    console.log(key);
  };

  const item = [
    {
      label: "Vet my Talent Request",
      key: "1",
      children: <TalentRequest />,
    },
  ];

  return (
    <Container>
      <DashboardHeader
        title="Vetted Talent Program"
        para=" Check out Organisations that are making the most impact"
        para2="on Funding, Grants, & Scholarships"
      />
      <Space direction="horizontal" className="gap-6 px-1">
        <Card
          style={{
            width: 140,
            boxShadow: "-12px 0px 1px 0px #eeeafb",
          }}
          className="rounded-lg pl-1 border-gray-60 "
        >
          <Text className="text-gray-400 text-xs leading-none font-Montserrat">
            All
          </Text>
          <Title level={3} className="mt-1 font-Montserrat">
            72
          </Title>
        </Card>
        <Card
          style={{
            width: 140,
            boxShadow: "-12px 0px 1px 0px #3686E4",
          }}
          className="rounded-lg pl-1 border-gray-60 "
        >
          <Text className="text-gray-400 text-xs leading-none font-Montserrat">
            In Review
          </Text>
          <Title level={3} className="mt-1 font-Montserrat">
            8
          </Title>
        </Card>
        <Card
          style={{
            width: 140,
            boxShadow: "-12px 0px 1px 0px #9424BC",
          }}
          className="rounded-lg pl-1 border-gray-60 "
        >
          <Text className="text-gray-400 text-xs leading-none font-Montserrat">
            In Progress
          </Text>
          <Title level={3} className="mt-1 font-Montserrat">
            12
          </Title>
        </Card>
        <Card
          style={{
            width: 140,
            boxShadow: "-12px 0px 1px 0px #FCBD06",
          }}
          className="rounded-lg pl-1 border-gray-60 "
        >
          <Text className="text-gray-400 text-xs leading-none font-Montserrat">
            Completed
          </Text>
          <Title level={3} className="mt-1 font-Montserrat">
            9
          </Title>
        </Card>
        <Card
          style={{
            width: 140,
            boxShadow: "-12px 0px 1px 0px #59AA1A",
          }}
          className="rounded-lg pl-1 border-gray-60 "
        >
          <Text className="text-gray-400 text-xs leading-none font-Montserrat">
            Withdrawn
          </Text>
          <Title level={3} className="mt-1 font-Montserrat">
            6
          </Title>
        </Card>
        <Card
          style={{
            width: 140,
            boxShadow: "-12px 0px 1px 0px #FF4A4A",
          }}
          className="rounded-lg pl-1 border-gray-60 "
        >
          <Text className="text-gray-400 text-xs leading-none font-Montserrat">
            Purchase Order
          </Text>
          <Title level={3} className="mt-1 font-Montserrat">
            4
          </Title>
        </Card>
      </Space>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={item}
        className="basis-full text-xl font-semibold leading-6 px-6 py-8"
      />
    </Container>
  );
};
export default VettedTalents;
