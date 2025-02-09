"use client";

import { Layout, Typography } from "antd";

type DashboardHeaderProps = {
  title: string;
  para: string;
  para2?: string;
};
const DashboardHeader = ({ title, para, para2 }: DashboardHeaderProps) => {
  const { Header } = Layout;
  const { Title, Paragraph } = Typography;
  return (
    <>
      <Header className="bg-inherit pt-4 mb-[15%] sm:mb-[7%] px-1 w-full">
        <Title level={2} className="text-black font-bold leading-none">
          {title}
        </Title>
        <Paragraph className="text-gray-400 font-normal leading-tight">
          {para}
          <br />
          {para2}
        </Paragraph>
      </Header>
    </>
  );
};

export default DashboardHeader;
