"use client";
import React, { useState } from "react";
// next
import NextLink from "next/link";
// ant component and icons
import { Menu, MenuProps, Typography } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  BookOutlined,
  AuditOutlined,
  WalletOutlined,
  SafetyOutlined,
  ProfileOutlined,
  SettingOutlined,
  CommentOutlined,
  UserSwitchOutlined,
  ShoppingCartOutlined,
  ExclamationCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import ComingSoonModal from "@/components/shared/Soon/ComingSoonModal";
interface SidebarMenuProps {
  selectedKeys: string;
}

// admin dashboard sidebar menu items[]

const SidebarMenu = ({ selectedKeys }: SidebarMenuProps) => {
  const [comingSoon, setComingSoon] = useState(false);
  const openComingSoon = () => {
    setComingSoon(true);
  };
  const items: MenuProps["items"] = [
    {
      label: <NextLink href="/business/">Home</NextLink>,
      key: "/business",
      icon: <HomeOutlined />,
    },
    {
      label: (
        <NextLink href="/business/manage-accounts">Manage Accounts</NextLink>
      ),
      key: "/business/manage-accounts",
      icon: <SafetyOutlined />,
    },
    {
      label: <NextLink href="/business/courses">Learning</NextLink>,
      key: "/business/learning/courses",
      icon: <TeamOutlined />,
    },
    {
      label: <NextLink href="/business/jobs">Jobs</NextLink>,
      key: "/business/jobs",
      icon: <AuditOutlined />,
    },
    {
      label: <NextLink href="/business/funding">Funding</NextLink>,
      key: "/business/funding",
      icon: <WalletOutlined />,
    },
    {
      label: (
        <NextLink href="/business/messages">Messages</NextLink>
        // <Typography.Paragraph
        //   className=" m-0 cursor-pointer"
        //   onClick={openComingSoon}
        // >
        //   Messages
        // </Typography.Paragraph>
      ),
      key: "/business/messages",
      icon: <CommentOutlined />,
    },
    {
      label: (
        // <NextLink href="/business/talent-program">
        //   Vetted Talent Program
        // </NextLink>
        <Typography.Paragraph
          className=" m-0 cursor-pointer"
          onClick={openComingSoon}
        >
          Vetted Talent Program
        </Typography.Paragraph>
      ),
      key: "/business/talent-program",
      icon: <UserSwitchOutlined />,
    },
    {
      label: (
        // <NextLink href="/business/orders">Orders</NextLink>
        <Typography.Paragraph
          className=" m-0 cursor-pointer"
          onClick={openComingSoon}
        >
          Orders
        </Typography.Paragraph>
      ),
      key: "/business/orders",
      icon: <ShoppingCartOutlined />,
    },
    {
      label: <NextLink href="/business/payments">Billing & Payments</NextLink>,
      key: "/business/payments",
      icon: <ProfileOutlined />,
    },
    {
      label: (
        <NextLink href="/business/associated-users">Associated Users</NextLink>
      ),
      key: "/business/associated-users",
      icon: <UserAddOutlined />,
    },
    {
      label: <NextLink href="/business/settings">Settings</NextLink>,
      key: "/business/settings",
      icon: <SettingOutlined />,
    },
    // {
    //   label: <NextLink href="/business/help">Help & Support Center</NextLink>,
    //   key: "/business/help",
    //   icon: <ExclamationCircleOutlined />,
    // },
  ];
  return (
    <div>
      <Menu mode="inline" defaultSelectedKeys={[selectedKeys]} items={items} />
      <ComingSoonModal comingSoon={comingSoon} setComingSoon={setComingSoon} />
    </div>
  );
};

export default SidebarMenu;
