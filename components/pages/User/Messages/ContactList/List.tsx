"use client";
import { Button, Checkbox, Dropdown, Input, Table } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import dp from "@/public/images/avatar/IMG.png";
import Link from "next/link";

interface User {
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  stateofprovince: string;
  country: string;
}

const users: User[] = [
  {
    fullName: "Anna Smith",
    email: "annasmith@domain.com",
    mobile: "+49 153434553322",
    city: "Cologne",
    stateofprovince: "North-Rhein Westfalen",
    country: "Germany",
  },
  {
    fullName: "Anna Smith",
    email: "annasmith@domain.com",
    mobile: "+49 153434553322",
    city: "Cologne",
    stateofprovince: "North-Rhein Westfalen",
    country: "Germany",
  },
  {
    fullName: "Anna Smith",
    email: "annasmith@domain.com",
    mobile: "+49 153434553322",
    city: "Cologne",
    stateofprovince: "North-Rhein Westfalen",
    country: "Germany",
  },
  {
    fullName: "Anna Smith",
    email: "annasmith@domain.com",
    mobile: "+49 153434553322",
    city: "Cologne",
    stateofprovince: "North-Rhein Westfalen",
    country: "Germany",
  },
  {
    fullName: "Anna Smith",
    email: "annasmith@domain.com",
    mobile: "+49 153434553322",
    city: "Cologne",
    stateofprovince: "North-Rhein Westfalen",
    country: "Germany",
  },
  {
    fullName: "Anna Smith",
    email: "annasmith@domain.com",
    mobile: "+49 153434553322",
    city: "Cologne",
    stateofprovince: "North-Rhein Westfalen",
    country: "Germany",
  },
  {
    fullName: "Anna Smith",
    email: "annasmith@domain.com",
    mobile: "+49 153434553322",
    city: "Cologne",
    stateofprovince: "North-Rhein Westfalen",
    country: "Germany",
  },
  {
    fullName: "Anna Smith",
    email: "annasmith@domain.com",
    mobile: "+49 153434553322",
    city: "Cologne",
    stateofprovince: "North-Rhein Westfalen",
    country: "Germany",
  },
];

const List = () => {
  const [actions, setActions] = useState(false);
  const [index, setIndex] = useState(0);

  const handleShowAction = () => {
    setIndex(0);
    if (index === 0) {
      setActions(!actions);
    }
  };

  const items = [
    { key: "1", label: "Add a new contact to list" },
    { key: "2", label: "Remove contact to list" },
    { key: "3", label: "Email voucher code" },
  ];

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => <Checkbox />,
      className: "border-b-2 border-grey-500  py-2",
    },
    {
      title: "Profile",
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: () => <Image src={dp} alt="Profile" width={40} height={40} />,
      className: "border-b-2 border-gray-500",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      className: "border-b-2 border-gray-500",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      className: "border-b-2 border-gray-500",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
      className: "border-b-2 border-gray-500",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      className: "border-b-2 border-gray-500",
    },
    {
      title: "State of Province",
      dataIndex: "stateofprovince",
      key: "stateofprovince",
      className: "border-b-2 border-gray-500",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      className: "border-b-2 border-gray-500",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <div className="relative">
          <Dropdown menu={{ items }}>
            <Link href="#">
              <BsThreeDots
                className="cursor-pointer"
                onClick={handleShowAction}
              />
            </Link>
          </Dropdown>
        </div>
      ),
      className: "border-b-2 border-gray-500",
    },
  ];

  const data = users.map((user, index) => ({
    key: index,
    ...user,
  }));

  return (
    <>
      <div className="mt-[45px]">
        <div>
          <Input
            size="large"
            className="rounded-[8px] bg-[#E9ECEF] w-[729px] text-xl font-semibold leading-6 md:w-[549px] h-[70px]"
            placeholder="Messenger Contacts"
          />
        </div>
        <div className="mt-8 ">
          <Button
            className="text-base h-12 w-[240px] leading-[19.2px] font-semibold"
            type="primary"
            size="large"
          >
            Email Voucher Codes
          </Button>
          <Button className="text-[16px] ml-[20.37px] text-purple-50 border-2 h-12 w-[108px] font-semibold leading-[19.2px] text-purple">
            Edit List
          </Button>
        </div>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5, position: ["bottomCenter"] }}
          className="w-full mt-[55px] border-collapse"
          rowClassName="profile-row"
        />
      </div>
    </>
  );
};

export default List;
