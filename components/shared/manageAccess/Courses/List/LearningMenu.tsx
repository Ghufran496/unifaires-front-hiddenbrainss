"use client";
import { useContext } from "react";
import { Menu } from "antd";
import { courseListContext } from "./couseListContext";

const LearningMenu = () => {
  const courseContext = useContext(courseListContext);
  
  return (
    <Menu
      items={courseContext?.menu?.items}
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[courseContext?.menu?.activeKey]}
    />
  );
};

export default LearningMenu;
