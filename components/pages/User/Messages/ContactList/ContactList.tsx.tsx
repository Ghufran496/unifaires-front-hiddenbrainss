"use client";

import { Button, Input, Menu, Dropdown } from "antd";
import React, { useState } from "react";
import { BsPhone, BsThreeDots } from "react-icons/bs";
import All from "./All";
import Top from "./Top";
import List from "./List";
import { Search } from "react-iconly";
import { GiContract } from "react-icons/gi";

const ContactList = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      index: 0,
      label: "Top",
      key: "top",
      component: <Top />,
    },
    {
      index: 1,
      label: "All",
      key: "all",
      component: <All />,
    },
    {
      index: 2,
      label: "List",
      key: "list",
      component: <List />,
    },
  ];

  const menu = (
    <Menu className="text-base font-medium leading-[19.2px] ">
      <Menu.Item key="addContact">Add a new contact</Menu.Item>
      <Menu.Item key="sortFirstName">Sort by first name</Menu.Item>
      <Menu.Item key="sortSurname">Sort by surname</Menu.Item>
      <Menu.Item key="importCSV">Import from CSV file (5MB max)</Menu.Item>
      <Menu.Item key="exportCSV">Export to CSV file</Menu.Item>
      <Menu.Item key="printAll">Print all</Menu.Item>
    </Menu>
  );

  return (
    <div className="mt-[120px] md:mt-8 px-6">
      <Button
        color="purple-50"
        className="text-white flex justify-center items-center gap-4  bg-purple-50 h-[49.2px] w-[169px] rounded-[80px] "
      >
        <BsPhone /> Contact List
      </Button>

      <Input
        size="large"
        className="rounded-[34px] w-[377px] mt-[44px] md:w-[349px] h-[53px]"
        placeholder="Search Messages"
        prefix={<Search />}
      />
      <div>
        <div className="w-1/2 pt-[35px] gap-[46px] whitespace-nowrap text-sm flex font-medium ">
          {items.map((data, index) => (
            <div
              className={`px-10 pb-4 font-semibold text-xl ${
                data.index === activeIndex
                  ? "text-purple-50  border-b-2 border-b-purple-50"
                  : ""
              } cursor-pointer`}
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              <p className="mt-1   leading-6 ml-2">{data.label}</p>
            </div>
          ))}
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className={`px-10 pb-4 font-semibold text-xl cursor-pointer`}>
              <BsThreeDots />
            </div>
          </Dropdown>
        </div>
      </div>
      {items[activeIndex].component}
    </div>
  );
};

export default ContactList;
