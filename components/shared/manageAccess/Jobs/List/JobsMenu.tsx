"use client";
import { useContext } from "react";
import { Menu } from "antd";
import { JobListContext } from "./JobListContext";

const JobsMenu = () => {
  const jobContextValues = useContext(JobListContext);

  return (
    <Menu
      items={
        Array.isArray(jobContextValues?.menu?.items)
          ? jobContextValues.menu.items
          : []
      }
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[jobContextValues?.menu?.activeKey]}
    />
  );
};

export default JobsMenu;
