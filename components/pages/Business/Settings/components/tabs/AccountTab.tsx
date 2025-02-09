"use client";
import dynamic from "next/dynamic";
// app components
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import Container from "@/components/shared/container";
import DashboardHeader from "@/components/shared/dashboardHeader";
import { Menu, Tabs } from "antd";
import Link from "next/link";
import BusinessDashboardLayout from "@/components/layouts/BusinessDashboard";
import { useEffect, useState } from "react";
const AccountPage = dynamic(() => import("../Account"));

const Account = () => {
  const items = [
    {
      label: <Link href="/business/settings/account">Account</Link>,
      key: "Account",
    },
    {
      label: <Link href="/business/settings/applications">Applications</Link>,
      key: "Applications",
    },
    {
      label: <Link href="/business/settings/organizations">Organizations</Link>,
      key: "Organizations",
    },
    {
      label: <Link href="/business/settings/notifications">Notifications</Link>,
      key: "Notifications",
    },
    {
      label: <Link href="/business/settings/privacy">Privacy & Security</Link>,
      key: "Privacy & Security",
    },
    {
      label: <Link href="/business/settings/profile">Profile</Link>,
      key: "Profile",
    },
    {
      label: <Link href="/business/settings/address">Address book</Link>,
      key: "Address",
    },
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <Container>
      <DashboardHeader
        title="Settings"
        para="Find, edit and delete jobs you have posted for qualified"
        para2="candidates"
      />
      {/* <div className="sm:display-none">
          <Tabs
            defaultActiveKey="2"
            onChange={onChange}
            items={items}
            className="sm:display-none lg:flex"
          />
        </div>
        <Menu
          //defaultActiveKey="1"
          //onChange={onChange}
          items={items}
          className="sm-bg-transparent flex-none"
  /> */}
      {isSmallScreen ? null : (
        <Tabs
          defaultActiveKey="2"
          onChange={onChange}
          items={items}
          className="lg:flex"
        />
      )}
      <AccountPage />
    </Container>
  );
};

export default Account;
