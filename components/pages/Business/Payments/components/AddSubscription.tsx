"use client";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, MenuProps, Space } from "antd";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "react-iconly";
import { message } from "antd";
import { BsCheck } from "react-icons/bs";

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const items: MenuProps["items"] = [
  {
    label: "1st menu item",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "3rd menu item",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "4rd menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const TransactionsDetails = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between w-full  mt-6">
        <div className="flex">
          <Link href="#" className="font-semibold text-[14px]">
            <p>Subscription services</p>
          </Link>
          <div className="mt-[2px] px-2">
            <ChevronRight size={18} />
          </div>
          <Link href="#" className="text-purple-50 text-[14px] font-semibold">
            <p>Individual Pro Access</p>
          </Link>
          <div className="mt-[2px] px-2">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
      <div className="flex gap-26 justify-between">
        <div>
          <h1 className="text-[32px] mt-10 font-bold  ">
            Pick your Subscription Options
          </h1>
          <p className="text-lg font-medium leading-[28.4px]   ">
            We’ve got a universally fair options that’s right <br /> for you
            based on your plan
          </p>
        </div>
        <div className="mt-10 flex gap-[17px] ">
          <Link href="/business/payments/sub-plan">
            <div>
              <Button className="text-base  font-medium" size="large">
                Your subscription plan
              </Button>
            </div>
          </Link>

          <Dropdown menu={menuProps}>
            <Button className="text-base font-medium" size="large">
              <Space>
                Individual Pro Access
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="flex gap-20 ">
        <Card className="bg-[#5F38DD] mt-10 rounded-[20px] pt-7 w-[360px] text-white  ">
          <h1 className="font-bold text-[32px]">1 Year</h1>
          <p className="text-[35px] mt-6 font-bold">$0 </p>
          <div className="flex gap-6 mt-8 ">
            <BsCheck size={34} className="text-green-300" color="green" />
            <p className="text-lg font-medium">68% Off | Save $106.40</p>
          </div>
          <div className="flex gap-6 mt-4 ">
            <BsCheck size={34} className="text-green-300" color="green" />
            <p className="text-lg font-medium">Billed Annually</p>
          </div>
          <div className="flex gap-6 mt-4 ">
            <BsCheck size={34} className="text-green-300" color="green" />
            <p className="text-lg font-medium">Renews at $49</p>
          </div>
          {/* <div className="flex gap-6 mt-4 ">
            <BsCheck size={34} className="text-green-300" color="green" />
            <p className="text-lg font-medium">Cancel Anytime</p>
          </div> */}
          <div className=" text-center">
            <Button className="bg-white mt-[99px] text-black text-lg font-bold rounded-[40px] h-[70px] w-[285px]   ">
              Current Plan
            </Button>
          </div>
        </Card>
        <Card className="bg-[#5F38DD] mt-10 rounded-[20px] pt-7 w-[360px] text-white  ">
          <h1 className="font-bold text-[32px]">1 Year</h1>
          <p className="text-[35px] mt-6 font-bold">
            $49{" "}
            <span className="text-lg font-semibold mt-6 line-through ">
              was $99
            </span>
          </p>
          <div className="flex gap-6 mt-8 ">
            <BsCheck size={34} className="text-green-300" color="green" />
            <p className="text-lg font-medium">68% Off | Save $106.40</p>
          </div>
          <div className="flex gap-6 mt-4 ">
            <BsCheck size={34} className="text-green-300" color="green" />
            <p className="text-lg font-medium">Billed Annually</p>
          </div>
          <div className="flex gap-6 mt-4 ">
            <BsCheck size={34} className="text-green-300" color="green" />
            <p className="text-lg font-medium">Renews at $99</p>
          </div>
          <div className="flex gap-6 mt-4 ">
            <BsCheck size={34} className="text-green-300" color="green" />
            <p className="text-lg font-medium">Cancel Anytime</p>
          </div>
          <div className=" text-center">
            <Button className="bg-white mt-[49px] text-black text-lg font-bold rounded-[40px] h-[70px] w-[285px]   ">
              Subscribe
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsDetails;
