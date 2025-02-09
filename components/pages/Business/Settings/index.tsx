"use client";
import { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
// app components
import { Tabs, Typography } from "antd";
import { useSession } from "next-auth/react";
import config from "@/app/utils/config";
import axios from "axios";
import ComingSoonModal from "@/components/shared/Soon/ComingSoonModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllAddress } from "@/redux/features/AddressSlice";
import { RootState } from "@/redux/store";
const AccountPage = dynamic(() => import("./components/Account"));
const ApplicationPage = dynamic(() => import("./components/Application"));
const OrganizationsPage = dynamic(() => import("./components/Organizations"));
const NotificationsPage = dynamic(() => import("./components/Notifications"));
const PrivacyPage = dynamic(() => import("./components/Privacy"));

const Settings = () => {
  const { data: session, status } = useSession();
  const dispatch: any = useAppDispatch();
  const userId = session?.user?.id;
  const [comingSoon, setComingSoon] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllAddress(userId));
    }
  }, [status]);

  const defaultAddress = useAppSelector(
    (state: RootState) => state.address.defaultAddress
  );

  // console.log("this is defualt address", defaultAddress);

  const items = [
    {
      label: "Account",
      key: "Account",
      children: <AccountPage />,
    },
    {
      label: "Applications",
      key: "Applications",
      children: <ApplicationPage />,
    },
    {
      label: "Organizations",
      key: "Organizaions",
      children: <OrganizationsPage defaultAddress={defaultAddress} />,
    },
    {
      label: "Notifications",
      key: "Notifications",
      children: (
        <ComingSoonModal
          comingSoon={comingSoon}
          setComingSoon={setComingSoon}
        />
      ),
      // children: <NotificationsPage />,
    },
    {
      label: "Privacy & Security",
      key: "Privacy & Security",
      children: (
        <ComingSoonModal
          comingSoon={comingSoon}
          setComingSoon={setComingSoon}
        />
      ),
      // children: <PrivacyPage />,
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
    if (key === "Notifications" || key === "Privacy & Security") {
      setComingSoon(true);
    }
    console.log(key);
  };

  return (
    <Fragment>
      <div className="m-8">
        <section>
          <div>
            <Typography.Title level={2}>Settings</Typography.Title>
            <Typography.Paragraph className="mt-0">
              Find, edit and delete jobs you have posted for qualified
              candidates
            </Typography.Paragraph>
          </div>
          {isSmallScreen && <AccountPage />}
          {isSmallScreen ? null : (
            <Tabs onChange={onChange} items={items} className="lg:flex" />
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Settings;
