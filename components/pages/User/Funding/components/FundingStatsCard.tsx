"use client";
// antd components and icons
import { Card } from "antd";
import { ReactNode } from "react";
import Link from "next/link";
// antd components
import { Menu } from "antd";
import ShadowCard from "@/components/shared/shadow-cards";

interface JobsMenuProps {
  activeKey: string;
}

const JobStatsCard = ({ activeKey }: JobsMenuProps) => {
  const cardInfo = [
    { id: "1", desc: "All", title: "72", shadowColor: "#5832DA10" },
    { id: "2", desc: "Unassigned", title: "8", shadowColor: "#3686E4" },
    { id: "3", desc: "Phone Interview", title: "12", shadowColor: "#9424BC" },
    {
      id: "4",
      desc: "1st Person Interview",
      title: "9",
      shadowColor: "#FCBD06",
    },
    {
      id: "5",
      desc: "2nd Person Interview",
      title: "6",
      shadowColor: "#B6DA24",
    },
    { id: "6", desc: "Rejected", title: "4", shadowColor: "#FF4A4A" },
  ];
  const items = [
    {
      label: <Link href="/user/jobs">My Jobs</Link>,
      key: "my-jobs",
    },
    {
      label: <Link href="/user/jobs/wishlist">Wishlist</Link>,
      key: "wishlist",
    },
    {
      label: <Link href="/user/jobs/archived">Archived</Link>,
      key: "archived",
    },
  ];
  return (
    <Card className="rounded-lg overflow-hidden p-0 [&>div.ant-card-body]:p-0">
      <ShadowCard cardInfo={cardInfo} />

      {/* <Menu
        items={items}
        mode="horizontal"
        className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
        defaultSelectedKeys={[activeKey]}
      /> */}
    </Card>
  );
};

export default JobStatsCard;
