"use client";
import React, { Fragment, useEffect, useState } from "react";
// next
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
// app components
import AppHead from "../AppHead";
import SidebarMenu from "./SidebarMenu";
// props and interface
import { AdminDashboardLayoutProps } from "./interfaceType";
// ant component and icons /* Grid */
import {
  CheckCircleFilled,
  CloseOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Avatar, Button, Typography, Grid, Drawer, Image } from "antd";
import { signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// layout
const { Content, Sider } = Layout;
// typography
const { Title, Paragraph } = Typography;

const BusinessDashboardLayout = ({
  title,
  image,
  children,
  description,
  showSideMenu = true,
}: AdminDashboardLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const screens = Grid.useBreakpoint();

  // const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  //
  let activeRouteArr = pathname.split("/");
  let activeRoute = `/business${
    activeRouteArr.length > 2 ? `/${activeRouteArr[2]}` : ""
  }`;

  const myProfile = useAppSelector((state: any) => state.user.myProfile);
  const imageUrl = myProfile && myProfile.imageUrl;

  const closeDashboardMenu = () => {
    setDashboardOpen(false);
  };

  return (
    <Fragment>
      <AppHead title={title} image={image} description={description} />
      <Layout className="bg-grey-50">
        {(screens.xs || (screens.sm && !screens.lg)) && (
          <Button
            type="text"
            className="flex items-end mt-4 ml-auto"
            onClick={() => setDashboardOpen(true)}
          >
            {dashboardOpen ? (
              <CloseOutlined className="text-2xl mt-4 text-black" />
            ) : (
              <MenuOutlined className="text-2xl mt-4 text-black" />
            )}
            <span className="text-lg font-bold">Dashboard</span>
          </Button>
        )}
        <Drawer
          // closable={false}
          placement="right"
          open={dashboardOpen}
          onClose={closeDashboardMenu}
        >
          <Layout>
            <div className="px-5 py-2 bg-white">
              <div className="flex items-center justify-start gap-6 content-center justify-items-center">
                {imageUrl ? (
                  <div className="">
                    <Avatar
                      size={50}
                      icon={
                        <Image
                          src={imageUrl}
                          alt="profile picture"
                          className="rounded-full justify-self-start"
                          width={60}
                          height={60}
                        />
                      }
                    />
                  </div>
                ) : (
                  <Avatar size={50} icon={<UserOutlined />} />
                )}
                <div>
                  <div className="flex items-center justify-between gap-2 capitalize">
                    <h3 className="font-bold text-base ">
                      {myProfile?.firstname}
                    </h3>
                  </div>
                  <small className="text-start font-medium ">
                    {myProfile.email}
                  </small>
                </div>
              </div>
              <div className="flex justify-center">
                <Paragraph className="w-4/6 px-4 py-1 text-center text-purple-500 rounded-full bg-purple-60">
                  Business Account
                </Paragraph>
              </div>
            </div>
            <SidebarMenu selectedKeys={activeRoute} />
            <div className="px-5 mt-2">
              {/* <NextLink href="/logout" passHref> */}
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
              {/* </NextLink> */}
            </div>
          </Layout>
        </Drawer>
        <Layout>
          {(!screens.xs || (!screens.sm && screens.lg)) && (
            <Sider
              width={280}
              breakpoint="lg"
              collapsedWidth="0"
              // collapsed={!showSideMenu}
              className="sticky top-0 py-5 overflow-x-hidden overflow-y-auto bg-white"
            >
              <div className="px-5 mb-2">
                <div className="flex items-center justify-start gap-6 content-center justify-items-center">
                  {imageUrl ? (
                    <div className="">
                      <Avatar
                        size={50}
                        icon={
                          <Image
                            src={imageUrl}
                            alt="profile picture"
                            className="rounded-full justify-self-start"
                            width={60}
                            height={60}
                          />
                        }
                      />
                    </div>
                  ) : (
                    <Avatar size={50} icon={<UserOutlined />} />
                  )}
                  <div>
                    <div className="flex items-center justify-between gap-2 capitalize">
                      <h3 className="font-bold text-base ">
                        {myProfile?.firstname}
                      </h3>
                    </div>
                    <small className="text-start font-medium ">
                      {myProfile.email}
                    </small>
                  </div>
                  <CheckCircleFilled className="text-purple-500" />
                </div>
                <div className="flex justify-center">
                  <Paragraph className="w-4/6 px-4 py-1 text-center text-purple-500 rounded-full bg-purple-60">
                    Business Account
                  </Paragraph>
                </div>
              </div>
              <SidebarMenu selectedKeys={activeRoute} />
              <div className="px-5 mt-2">
                {/* <NextLink href="/logout" passHref> */}
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
                {/* </NextLink> */}
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
      </Layout>
    </Fragment>
  );
};

export default BusinessDashboardLayout;
