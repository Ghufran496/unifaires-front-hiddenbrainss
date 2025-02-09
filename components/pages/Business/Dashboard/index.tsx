"use client";
import React, { Fragment, useEffect, useState } from "react";
// next component
// antd components
import { Row, Col, Input, Typography } from "antd";
import {
  TeamOutlined,
  WalletOutlined,
  SafetyOutlined,
  ProfileOutlined,
  SettingOutlined,
  CommentOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
// app component
import Container from "@/components/shared/container";
import DashboardMenuCard, { DashboardMenuCardPops } from "./DashboardMenuCard";
import { useAppSelector } from "@/redux/hooks";

const Dashboard = () => {
  const myProfile = useAppSelector((state: any) => state.user.myProfile);
  // const imageUrl = myProfile && myProfile.imageUrl;
  const businessDashboardMenuItems: DashboardMenuCardPops[] = [
    {
      link: "/business/manage-accounts",
      title: "Manage Account",
      icon: <SafetyOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about your learning
        </Typography.Paragraph>
      ),
    },
    {
      link: "/business/courses",
      title: "My Learning",
      icon: <TeamOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about your learning
        </Typography.Paragraph>
      ),
    },
    {
      link: "/business/jobs",
      title: "My Jobs",
      icon: <WalletOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about your learning
        </Typography.Paragraph>
      ),
    },
    {
      link: "/business/funding",
      title: "My Funding",
      icon: <WalletOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about your learning
        </Typography.Paragraph>
      ),
    },
    {
      link: "/business/messages",
      title: "Messages",
      icon: <CommentOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about your learning
        </Typography.Paragraph>
      ),
    },
    // {
    //   link: "/business/talent-program",
    //   title: "Vetted Talent Program",
    //   icon: <UserSwitchOutlined />,
    //   description: (
    //     <Typography.Paragraph>
    //       See relevant insights about your learning
    //     </Typography.Paragraph>
    //   ),
    // },
    // {
    //   link: "/admin/orders",
    //   title: "My Orders",
    //   icon: <ShoppingCartOutlined />,
    //   description: (
    //     <Typography.Paragraph>
    //       See relevant insights about your learning
    //     </Typography.Paragraph>
    //   ),
    // },
    {
      link: "/business/payments",
      title: "Billings & Payments",
      icon: <ProfileOutlined />,
      description: (
        <Typography.Paragraph>
          See relevant insights about your learning
        </Typography.Paragraph>
      ),
    },
    {
      link: "/business/associated-users",
      title: "Associate Users",
      icon: <UserAddOutlined />,
      description: (
        <Typography.Paragraph>
          Give users special access code
        </Typography.Paragraph>
      ),
    },
    {
      link: "/business/settings",
      title: "Settings",
      icon: <SettingOutlined />,
      description: (
        <Typography.Paragraph>
          Manage your Profile and Settings
        </Typography.Paragraph>
      ),
    },
    // {
    //   link: "/business/help",
    //   title: "Help",
    //   icon: <ExclamationCircleOutlined />,
    //   description: (
    //     <Typography.Paragraph>Talk to our Support team</Typography.Paragraph>
    //   ),
    // },
    // {
    //   link: "/business/associated-user",
    //   title: "Promotion & Voucher codes",
    //   icon: <BookOutlined />,
    //   description: (
    //     <Typography.Paragraph>
    //       See relevant insights about your learning
    //     </Typography.Paragraph>
    //   ),
    // },
  ];
  return (
    <Fragment>
      <section>
        <Container className="p-6 container-fluid">
          <Row gutter={16} className="w-full">
            <Col xs={24} lg={18}>
              <Typography.Title level={2} className="mb-0">
                Dashboard
              </Typography.Title>
              <Typography.Paragraph>
                Welcome {myProfile?.firstname}, here are your daily analytics
              </Typography.Paragraph>
            </Col>
            <Col xs={24} lg={6}>
              <div className="w-full mb-4">
                <Input.Search
                  className="mb-0"
                  placeholder="Search dashboards"
                  enterButton
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container className="p-6 container-fluid">
          <Row gutter={[16, 16]}>
            {businessDashboardMenuItems.map((items, index) => (
              <Col key={`menu-items-${index}`} xs={24} sm={12} lg={8}>
                <DashboardMenuCard {...items} />
              </Col>
            ))}

            {/* <Col xs={24} lg={6}>
              <Skills />
            </Col> */}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Dashboard;
