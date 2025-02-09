/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
// app components
import { Tabs, Typography } from "antd";
import { useSession } from "next-auth/react";
import config from "@/app/utils/config";
import axios from "axios";
import ComingSoonModal from "@/components/shared/Soon/ComingSoonModal";
const AccountPage = dynamic(() => import("./components/Account"));
const ApplicationPage = dynamic(() => import("./components/Application"));
const OrganizationsPage = dynamic(() => import("./components/Organizations"));
const NotificationsPage = dynamic(() => import("./components/Notifications"));
const PrivacyPage = dynamic(() => import("./components/Privacy"));
const ProfilePage = dynamic(() => import("./components/Profile/index"));

const Settings = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [defaultAddress, setDefaultAddress] = useState();
  const [comingSoon, setComingSoon] = useState(false);
  const openComingSoon = () => {
    setComingSoon(true);
  };

  const fetchUserAddress = async () => {
    await axios
      .get(`${config.API.API_URL}/address/user/${userId}`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        if (res.status) {
          const addressList = res.data.data;
          const defaultAdd = addressList.filter((defAddress: any) => {
            return defAddress.default === true;
          });
          setDefaultAddress(defaultAdd);
        }
      })
      .catch((e) => {
        // message.error("An error occur");
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUserAddress();
  }, []);

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
    {
      label: "Profile",
      key: "Profile",
      children: <ProfilePage />,
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
