"use client";
import React from "react";
// next
import NextLink from "next/link";
// antd components
import { Menu } from "antd";

interface LearningMenuProps {
  activeKey: string;
}

const items = [
  {
    label: <NextLink href="/business/manage-accounts">Invitations</NextLink>,
    key: "invitations",
  },
  // {
  //   label: <NextLink href="/business/manage-accounts/users">Users</NextLink>,
  //   key: "users",
  // },
  // {
  //   label: <NextLink href="/business/manage-accounts/teams">Teams</NextLink>,
  //   key: "teams",
  // },
  // {
  //   label: (
  //     <NextLink href="/business/manage-accounts/manage-alumni">
  //       Manage Alumni
  //     </NextLink>
  //   ),
  //   key: "manage-alumni",
  // },
];

const ManageAccountsMenu = ({ activeKey }: LearningMenuProps) => {
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[activeKey]}
    />
  );
};

export default ManageAccountsMenu;
