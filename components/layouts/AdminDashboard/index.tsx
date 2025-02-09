"use client";
import React, { Fragment, useState } from "react";

import { useRouter } from "next/router";
// app components
import AppHead from "../AppHead";
import AppFooter from "../Footer";
import AppHeader from "../Header";
import SidebarMenu from "./SidebarMenu";
// props and interface
import { AdminDashboardLayoutProps } from "./interfaceType";
// ant component and icons /* Grid */
import { CheckCircleFilled } from "@ant-design/icons";
import { Layout, Avatar, Button, Typography } from "antd";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";
const { Content, Sider } = Layout;

const { Title, Paragraph } = Typography;

const AdminDashboardLayout = ({
  title,
  image,
  children,
  description,
  showSideMenu = true,
}: AdminDashboardLayoutProps) => {
  const router = useRouter();
  // const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  //
  let activeRouteArr = router.pathname.split("/");
  let activeRoute = `/admin${
    activeRouteArr.length > 2 ? `/${activeRouteArr[2]}` : ""
  }`;

  // eslint-disable-next-line no-unused-vars
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const { data } = useSession();

  return (
    <Fragment>
      <AppHead title={title} image={image} description={description} />
      <Layout>
        <AppHeader />
        <Layout hasSider>
          {showSideMenu && (
            <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: "auto",
                bottom: 0,
              }}
              width={280}
              breakpoint="lg"
              collapsedWidth="0"
              // collapsed={!showSideMenu}
              className="sticky top-0 py-5 overflow-x-hidden overflow-y-auto bg-white"
            >
              <div className="px-5 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <Avatar size={40} className="bg-purple-400">
                      US
                    </Avatar>
                    <Title level={4} className="mb-0 leading-none">
                      {data?.user !== undefined ? data?.user?.fullname : null}
                    </Title>
                  </div>
                  <CheckCircleFilled className="text-purple-500" />
                </div>
                <Paragraph className="text-center">
                  Student, Harvard University
                </Paragraph>
                <div className="flex justify-center">
                  <Paragraph className="w-4/6 px-4 py-1 text-center text-purple-500 rounded-full bg-purple-60">
                    Admin Console
                  </Paragraph>
                </div>
              </div>
              <SidebarMenu selectedKeys={activeRoute} />
              <div className="px-5 mt-2">
                <Button
                  danger
                  block
                  className="rounded-lg"
                  onClick={() => {
                    signOut();
                    router.push("/login");
                  }}
                >
                  Sign out
                </Button>
              </div>
            </Sider>
          )}
          <Layout>
            <Content
              className="bg-grey-50"
              style={{
                margin: 0,
                minHeight: 320,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
        <AppFooter />
      </Layout>
    </Fragment>
  );
};

export default AdminDashboardLayout;
