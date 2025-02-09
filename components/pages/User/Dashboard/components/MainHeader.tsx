"use client";

import React from "react";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Typography } from "antd";
import SidebarSearch from "./SidebarSearch";
import { useSession } from "next-auth/react";
const MainHeader = () => {
  const { data: session } = useSession();

  const { Header } = Layout;

  return (
    <>
      <Header className="bg-transparent py-4 px-[0] flex max-[768px]:flex-col justify-between content-center w-full h-[initial] max-[830px]:px-[30px]">
        <div>
          <Typography.Title level={2} className="font-bold leading-none">
            Dashboard
          </Typography.Title>
          <h1 className="text-[#808080] font-Montserrat font-bold capitalize">
            Welcome{" "}
            <span className="text-black">{session?.user.firstname}</span> , here
            are your daily analytics
          </h1>
        </div>
      </Header>
    </>
  );
};

export default MainHeader;
