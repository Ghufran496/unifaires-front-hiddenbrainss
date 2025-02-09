"use client";
import React from "react";
// next
import NextLink from "next/link";
// antd components
import { Menu } from "antd";

interface TalentProgramMenuProps {
  activeKey: string;
}

const items = [
  {
    label: (
      <NextLink href="/admin/talent-program">Vetted Talent Request</NextLink>
    ),
    key: "talent-program",
  },
  {
    label: (
      <NextLink href="/admin/talent-program/request">
        Vet my Talent Request
      </NextLink>
    ),
    key: "request",
  },
  {
    label: (
      <NextLink href="/admin/talent-program/profiles">Vetted Profiles</NextLink>
    ),
    key: "profiles",
  },
];

const TalentProgramMenu = ({ activeKey }: TalentProgramMenuProps) => {
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[activeKey]}
    />
  );
};

export default TalentProgramMenu;
