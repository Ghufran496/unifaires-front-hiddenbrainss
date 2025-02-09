"use client";
import { useContext } from "react";
import { Menu } from "antd";
import { fundingListContext } from "./FundingListContext";

const FundingMenu = () => {
  const fundingContext = useContext(fundingListContext);

  return (
    <Menu
      items={fundingContext?.menu?.items}
      mode="horizontal"
      className="bg-transparent w-full [&>li:first-child]:pl-0 [&>li:first-child:after]:left-0"
      defaultSelectedKeys={[fundingContext?.menu?.activeKey]}
    />
  );
};

export default FundingMenu;
