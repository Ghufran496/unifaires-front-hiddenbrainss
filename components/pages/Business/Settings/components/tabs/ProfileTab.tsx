"use client";
import dynamic from "next/dynamic";
// app components
import UserDashboardLayout from "@/components/layouts/UserDashboard";
import Container from "@/components/shared/container";
import DashboardHeader from "@/components/shared/dashboardHeader";
import { Tabs } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = () => {
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
    <UserDashboardLayout>
      <Container>
        <DashboardHeader
          title="Settings"
          para="Find, edit and delete jobs you have posted for quaalified"
          para2="candidates"
        />
        {isSmallScreen ? null : (
          <Tabs
            defaultActiveKey="2"
            onChange={onChange}
            items={items}
            className="lg:flex"
          />
        )}
      </Container>
    </UserDashboardLayout>
  );
};

export default Profile;
