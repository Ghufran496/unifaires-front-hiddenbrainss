"use client";

import {
  TwoUsers,
  Work,
  Chat,
  People,
  Buy,
  Setting,
  InfoCircle,
} from "react-iconly";
import {
  WalletOutlined,
  ProfileOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

import Skills from "./Skills/index";
import DashboardCards from "./DashboardCards";

const MainContent = () => {
  const cardsData = [
    {
      link: "my-learning",
      title: "My Learning",
      icon: (
        <TwoUsers
          set="light"
          primaryColor="#5832DA"
          size={48}
          style={{ display: "initial" }}
        />
      ),
      text: "See relevant insights about your learning",
    },
    {
      link: "jobs",
      title: "My Jobs",
      icon: (
        <Work
          set="light"
          primaryColor="#5832DA"
          size={48}
          style={{ display: "initial" }}
        />
      ),
      text: "See relevant insights about your learning",
    },
    {
      link: "funding",
      title: "Funding",
      icon: <WalletOutlined style={{ fontSize: "48px", color: "#5832DA" }} />,
      text: "See relevant insights about your learning",
    },
    {
      link: "messages",
      title: "Messages",
      icon: (
        <Chat
          set="light"
          primaryColor="#5832DA"
          size={48}
          style={{ display: "initial" }}
        />
      ),
      text: "See relevant insights about your learning",
    },
    // {
    //   link: "vetted-talent-program",
    //   title: "Vetted Talent Program",
    //   icon: (
    //     <People
    //       set="light"
    //       primaryColor="#5832DA"
    //       size={48}
    //       style={{ display: "initial" }}
    //     />
    //   ),
    //   text: "See relevant insights about your learning",
    // },
    // {
    //   link: "yourorders",
    //   title: "Your Order",
    //   icon: (
    //     <Buy
    //       set="light"
    //       primaryColor="#5832DA"
    //       size={48}
    //       style={{ display: "initial" }}
    //     />
    //   ),
    //   text: "See relevant insights about your learning",
    // },
    {
      link: "payments",
      title: "Bills & Payments",
      icon: (
        <CreditCardOutlined style={{ fontSize: "48px", color: "#5832DA" }} />
      ),
      text: "Manage subscriptions and billings",
    },
    {
      link: "settings",
      title: "Settings",
      icon: (
        <Setting
          set="light"
          primaryColor="#5832DA"
          size={48}
          style={{ display: "initial" }}
        />
      ),
      text: "Manage your accounts and their settings",
    },
    // {
    //   link: "help",
    //   title: "Help",
    //   icon: (
    //     <InfoCircle
    //       set="light"
    //       primaryColor="#5832DA"
    //       size={48}
    //       style={{ display: "initial" }}
    //     />
    //   ),
    //   text: "Talk to our support team",
    // },
  ];

  return (
    <>
      <div className="flex gap-[20px] max-[830px]:flex-col max-[830px]:px-[30px]">
        <div className="h-full">
          <DashboardCards data={cardsData} />
        </div>
        <div className="pb-4">
          <Skills />
        </div>
      </div>
    </>
  );
};

export default MainContent;
