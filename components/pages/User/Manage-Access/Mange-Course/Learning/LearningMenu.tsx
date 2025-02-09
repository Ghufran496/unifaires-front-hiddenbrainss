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
  // {
  //   label: <NextLink href="/admin/learning">My Learning</NextLink>,
  //   key: "my-learning",
  // },
  {
    label: (
      <NextLink href="/user/business-access/courses">
        Published Courses
      </NextLink>
    ),
    key: "published-courses",
  },
  // {
  //   label: (
  //     <NextLink href="/business/learning/collections">My Collections</NextLink>
  //   ),
  //   key: "my-collections",
  // },
  // {
  //   label: <NextLink href="/business/learning/wishlist">Wishlist</NextLink>,
  //   key: "wishlist",
  // },
  {
    label: (
      <NextLink href="/user/business-access/learning/archive">Archive</NextLink>
    ),
    key: "archive",
  },
  // {
  //   label: <NextLink href="/business/learning/tools">Learning Tools</NextLink>,
  //   key: "learning-tools",
  // },
];

const LearningMenu = ({ activeKey }: LearningMenuProps) => {
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[activeKey]}
    />
  );
};

export default LearningMenu;
