/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useMemo } from "react";
import NextLink from "next/link";
import { Menu, MenuProps, Typography } from "antd";
import { Home, TwoUsers, Work, Chat, People, Buy, Setting } from "react-iconly";
import { WalletOutlined, ProfileOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ComingSoonModal from "@/components/shared/Soon/ComingSoonModal";
import { useManageUserPermission } from "@/app/utils/hooks/useManageUserPermission";

interface SidebarMenuProps {
  activeKey: string[];
}

// user dashboard sidebar menu items[]

const SidebarMenu = ({ activeKey }: SidebarMenuProps) => {
  const { hasAccessMenu } = useManageUserPermission();
  const [comingSoon, setComingSoon] = useState(false);

  const openComingSoon = () => {
    setComingSoon(true);
  };

  const MenuItems: Array<any> = [
    {
      key: "/user",
      icon: <Home set="light" primaryColor="currentColor" />,
      label: (
        <NextLink
          href="/user"
          passHref
          className="flex items-center text-sm text-gray-500 hover:text-black"
        >
          Home
        </NextLink>
      ),
    },
    {
      key: "/user/my-learning",
      icon: <TwoUsers set="light" primaryColor="currentColor" />,
      label: (
        <NextLink
          href="/user/my-learning"
          passHref
          className="flex items-center text-sm text-gray-500 hover:text-black"
        >
          My Learning
        </NextLink>
      ),
    },
    hasAccessMenu({ name: "content" }) && {
      key: "/user/business-access/course",
      icon: <TwoUsers set="light" primaryColor="currentColor" />,
      label: (
        <NextLink
          href="/user/business-access/course"
          passHref
          className="flex items-center text-sm text-gray-500 hover:text-black"
        >
          Manage Business Course
        </NextLink>
      ),
    },
    {
      key: "/user/jobs",
      icon: <Work set="light" primaryColor="currentColor" />,
      label: (
        <NextLink
          href="/user/jobs"
          passHref
          className="text-sm text-gray-500 hover:text-black"
        >
          Jobs
        </NextLink>
      ),
    },
    hasAccessMenu({ name: "job" }) && {
      key: "/user/business-access/jobs",
      icon: <Work set="light" primaryColor="currentColor" />,
      label: (
        <NextLink
          href="/user/business-access/jobs"
          passHref
          className="flex items-center text-sm text-gray-500 hover:text-black"
        >
          Manage Business Jobs
        </NextLink>
      ),
    },
    {
      key: "/user/funding",
      icon: <WalletOutlined style={{ fontSize: "21px" }} />,
      label: (
        <NextLink
          href="/user/funding"
          passHref
          className="flex items-center text-sm text-gray-500 hover:text-black"
        >
          Funding
        </NextLink>
      ),
    },
    hasAccessMenu({ name: "funding" })
      ? {
        key: "/user/business-access/funding",
        icon: <WalletOutlined style={{ fontSize: "21px" }} />,
        label: (
          <NextLink
            href="/user/business-access/funding"
            passHref
            className="flex items-center text-sm text-gray-500 hover:text-black"
          >
            Manage Business Funding
          </NextLink>
        ),
      }
      : undefined,
    {
      key: "/user/messages",
      icon: <Chat set="light" primaryColor="currentColor" />,
      label: (
        <NextLink
          href="/user/messages"
          passHref
          className="flex items-center text-sm text-gray-500 hover:text-black"
        >
          Messages
        </NextLink>
        // <Typography.Paragraph
        //   className=" m-0 cursor-pointer"
        //   onClick={openComingSoon}
        // >
        //   Messages
        // </Typography.Paragraph>
      ),
    },
    {
      key: "/user/vetted-talent-program",
      icon: <People set="light" primaryColor="currentColor" />,
      label: (
        // <NextLink href="/user/vetted-talent-program" passHref className="text-sm text-gray-500 hover:text-black">
        //   <Link>Vetted Talent Program</Link>
        // </NextLink>
        <Typography.Paragraph
          className=" m-0 cursor-pointer"
          onClick={openComingSoon}
        >
          Vetted Talent Program
        </Typography.Paragraph>
      ),
    },
    {
      key: "/user/yourorders",
      icon: <Buy set="light" primaryColor="currentColor" />,
      label: (
        // <NextLink href="/user/order" passHref className="text-sm text-gray-500 hover:text-black">
        //   <Link>Orders</Link>
        // </NextLink>
        <Typography.Paragraph
          className="m-0 cursor-pointer"
          onClick={openComingSoon}
        >
          Orders
        </Typography.Paragraph>
      ),
    },
    {
      key: "/user/payments",
      icon: <ProfileOutlined style={{ fontSize: "21px" }} />,
      label: (
        <NextLink
          href="/user/payments"
          passHref
          className="flex items-center m-0 text-sm text-gray-500 hover:text-black"
        >
          Billings & Payments
        </NextLink>
      ),
    },
    {
      key: "/user/settings",
      icon: <Setting set="light" primaryColor="currentColor" />,
      label: (
        <NextLink
          href="/user/settings"
          passHref
          className="flex items-center text-sm text-gray-500 hover:text-black"
        >
          Settings
        </NextLink>
      ),
    },
    hasAccessMenu({ name: "help_support" }) && {
      key: "/user/business-access/help",
      icon: <ExclamationCircleOutlined style={{ fontSize: "21px" }} />,
      label: (
        <NextLink
          href="/user/business-access/help"
          passHref
          className="flex items-center text-sm text-gray-500 hover:text-black"
        >
          Help & Support Center
        </NextLink>
      ),
    },
    // {
    //   key: "/user/help",
    //   icon: <InfoCircle set="light" primaryColor="currentColor" />,
    //   label: (
    //     <NextLink
    //       href="/user/help"
    //       passHref
    //       className="text-sm text-gray-500 hover:text-black"
    //     >
    //       Help & Support Center
    //     </NextLink>
    //   ),
    // },
  ];

  return (
    <div>
      <Menu
        mode="inline"
        items={MenuItems}
        className="text-xl font-semibold leading-[19.2px]"
        defaultSelectedKeys={[...activeKey]}
        style={{ height: "auto", borderRight: 0 }}
      />
      <ComingSoonModal comingSoon={comingSoon} setComingSoon={setComingSoon} />
    </div>
  );
};

export default SidebarMenu;
