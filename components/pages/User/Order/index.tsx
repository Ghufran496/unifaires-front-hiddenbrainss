"use client";
import React, { useState } from "react";
import AllOrders from "./AllOrders";
import CancelOrders from "./CancelOrders";
import FulfilledOrders from "./FulfilledOrders";
import UnfulfilledOrders from "./UnfulfilledOrders";
import PaidOrders from "./PaidOrders";
import UnpaidOrders from "./UnpaidOrders";
import ArchivedOrders from "./ArchivedOrders";
import PurchasedOrders from "./PurchasedOrders";
import { Menu } from "antd";

const Orders = () => {
  const [activeTab, setActiveTab] = useState(0);

  const orderTabs = [
    {
      id: 0,
      title: "All Orders",
      component: <AllOrders />,
    },
    {
      id: 1,
      title: "Cancelled Orders",
      component: <CancelOrders />,
    },
    {
      id: 2,
      title: "Fulfilled Orders",
      component: <FulfilledOrders />,
    },
    {
      id: 3,
      title: "Unfulfilled Orders",
      component: <UnfulfilledOrders />,
    },
    {
      id: 4,
      title: "Paid Orders",
      component: <PaidOrders />,
    },
    {
      id: 5,
      title: "Unpaid Orders",
      component: <UnpaidOrders />,
    },
    {
      id: 6,
      title: "Archived Orders",
      component: <ArchivedOrders />,
    },
    {
      id: 7,
      title: "Purchased Orders",
      component: <PurchasedOrders />,
    },
  ];
  return (
    <>
      <div className="mt-[48px] pl-4">
        <h1 className="text-[#3F3D56] text-[28px] pl-10 font-bold">
          Your Orders
        </h1>
        <div className=" mt-10 text-[18px] font-semibold text-[#495057]">
          <Menu mode="horizontal">
            {orderTabs.map((tab, index) => (
              <Menu.Item key={index} onClick={() => setActiveTab(index)}>
                {tab.title}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div>{orderTabs[activeTab].component}</div>
      </div>
    </>
  );
};

export default Orders;
