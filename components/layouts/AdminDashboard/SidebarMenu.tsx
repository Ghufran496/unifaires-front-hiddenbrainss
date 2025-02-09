"use client";
import React from "react";
// next
import NextLink from "next/link";
// ant component and icons
import { Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  AuditOutlined,
  WalletOutlined,
  SafetyOutlined,
  ProfileOutlined,
  SettingOutlined,
  CommentOutlined,
  UserSwitchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
interface SidebarMenuProps {
  selectedKeys: string;
}

// admin dashboard sidebar menu items[]
const items: MenuProps["items"] = [
  {
    label: <NextLink href="/admin/">Home</NextLink>,
    key: "/admin",
    icon: <HomeOutlined />,
  },
  {
    label: <NextLink href="/admin/manage-accounts">Manage Accounts</NextLink>,
    key: "/admin/manage-accounts",
    icon: <SafetyOutlined />,
  },
  {
    label: <NextLink href="/admin/learning/courses">Learning</NextLink>,
    key: "/admin/learning/courses",
    icon: <TeamOutlined />,
  },
  {
    label: <NextLink href="/admin/jobs">Jobs</NextLink>,
    key: "/admin/jobs",
    icon: <AuditOutlined />,
  },
  {
    label: <NextLink href="/admin/funding">Funding</NextLink>,
    key: "/admin/funding",
    icon: <WalletOutlined />,
  },
  {
    label: <NextLink href="/admin/messages">Messages</NextLink>,
    key: "/admin/messages",
    icon: <CommentOutlined />,
  },
  {
    label: (
      <NextLink href="/admin/talent-program">Vetted Talent Program</NextLink>
    ),
    key: "/admin/talent-program",
    icon: <UserSwitchOutlined />,
  },
  // {
  //   label: <NextLink href="/admin/orders">Orders</NextLink>,
  //   key: "/admin/orders",
  //   icon: <ShoppingCartOutlined />,
  // },
  {
    label: <NextLink href="/admin/payment">Billing & Payments</NextLink>,
    key: "/admin/payment",
    icon: <ProfileOutlined />,
  },
  // {
  //   label: (
  //     <NextLink href="/admin/promotions">Promotion & Voucher code</NextLink>
  //   ),
  //   key: "/admin/promotions",
  //   icon: <BookOutlined />,
  // },
  {
    label: <NextLink href="/admin/settings">Settings</NextLink>,
    key: "/admin/settings",
    icon: <SettingOutlined />,
  },
  {
    label: <NextLink href="/admin/help">Help & Support Center</NextLink>,
    key: "/admin/help",
    icon: <ExclamationCircleOutlined />,
  },
];

const SidebarMenu = ({ selectedKeys }: SidebarMenuProps) => {
  return (
    <Menu mode="inline" defaultSelectedKeys={[selectedKeys]} items={items} />
  );
};

export default SidebarMenu;
