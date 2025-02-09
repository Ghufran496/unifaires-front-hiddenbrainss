"use client";
import React, { useState } from "react";
import Container from "@/components/shared/container";
import DashboardHeader from "@/components/shared/dashboardHeader";
import { Tabs } from "antd";
import ArchievedTab from "./archivedTab";
import MyLearning from "./learningTab";
import LearningToolsTab from "./learningToolsTab";
import MyListTab from "./listTab";
import WhishListTab from "./whishlistTab";

const Learning: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState("1");

  const { TabPane } = Tabs;

  const items = [
    {
      label: <p id="learn">My Learning</p>,
      key: "1",
      children: <MyLearning activeTab={activeTab} />,
    },

    {
      label: "WishList",
      key: "2",
      children: <WhishListTab activeTab={activeTab} />,
    },
    {
      label: "Archived",
      key: "3",
      children: <ArchievedTab activeTab={activeTab} />,
    },
    // {
    //   label: "Learning Tools",
    //   key: "5",
    //   children: <LearningToolsTab />,
    // },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Container>
      <DashboardHeader
        title="My Learning"
        para="Check out Organisations that are making the most impact on Funding, Grants, & Scholarships"
      />

      <Tabs
        defaultActiveKey={activeTab}
        onChange={handleTabChange}
        tabBarGutter={50}
        className="flex justify-between"
      >
        {items.map((item) => (
          <TabPane
            tab={
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  color:
                    activeTab === item.key
                      ? "var(--primaryprimary-006, #5832DA)"
                      : "var(--almost-black, #2D2D2D)",
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "50%",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </div>
            }
            key={item.key}
          >
            {item.children}
          </TabPane>
        ))}
      </Tabs>
    </Container>
  );
};

export default Learning;
