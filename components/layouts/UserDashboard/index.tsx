"use client";
import React, { Fragment, useState, useEffect } from "react";
// next
import { usePathname, useRouter } from "next/navigation";
// app components
import AppHead from "../AppHead";
import SidebarMenu from "./SidebarMenu";
// props and interface
import { UserDashboardLayoutProps } from "./interfaceType";
// ant component and icons
import { Layout, Button, Grid, Drawer } from "antd";
import SidebarHeader from "./SidebarHeader";
import { signOut, useSession } from "next-auth/react";
import Popup from "../../shared/Popup";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

// import { SessionProvider } from "next-auth/react";

// const { data: session, status, update: sessionUpdate } = useSession();
// layout
const { Content, Sider } = Layout;

const UserDashboardLayout = ({
  title,
  image,
  children,
  description,
}: // session

  UserDashboardLayoutProps) => {
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const activeRouteArr = pathname.split("/");
  const screens = Grid.useBreakpoint();
  const closeDashboardMenu = () => {
    setDashboardOpen(false);
  };

  return (
    <Fragment>
      <AppHead title={title} image={image} description={description} />
      <Layout>
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
            <SidebarHeader />
            <SidebarMenu
              activeKey={[
                `/user${activeRouteArr.length > 2 ? activeRouteArr[2] === "business-access" ? `/${activeRouteArr[2]}/${activeRouteArr[3]}` : ` / ${activeRouteArr[2]}` : ""
                }`,
              ]}
            />
            <div className="px-5 mt-2">
              {/* <NextLink href="/logout" passHref> */}
              <Button
                type="primary"
                block
                className="rounded-lg w-[80%] h-[54px] text-base font-medium leading-[19.2px] mx-auto my-5"
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
              >
                Sign out
              </Button>
              {/* </NextLink> */}
            </div>
          </Layout>
          {/* <LectureList closeSider={closeLectureMenu} /> */}
        </Drawer>

        <Layout>
          <Sider
            style={{
              overflow: "auto",
              // height: "120vh",
              position: "fixed",
              left: 0,
              top: "auto",
              bottom: 0,
            }}
            width={300}
            breakpoint="lg"
            collapsedWidth="0"
            // collapsed={!showSideMenu}
            className="sticky top-0 py-5 overflow-x-hidden overflow-y-auto bg-white"
          >
            <SidebarHeader />
            <SidebarMenu
              activeKey={[
                `/user${activeRouteArr.length > 2 ? activeRouteArr[2] === "business-access" ? `/${activeRouteArr[2]}/${activeRouteArr[3]}` : ` / ${activeRouteArr[2]}` : ""
                }`,
              ]}
            />
            <div className="px-5 mt-2">
              {/* <NextLink href="/logout" passHref> */}
              <Button
                type="primary"
                block
                className="rounded-lg w-[80%] h-[54px] text-base font-medium leading-[19.2px] mx-auto my-5"
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
          <Layout>
            <Content
              // className="bg-grey-50"
              style={{
                margin: 0,
                minHeight: 320,
              }}
            // className="overflow-y-scroll h-screen"
            >
              {children}
              {/* {open && <Popup open={setOpen} />} */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default UserDashboardLayout;
function setOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
