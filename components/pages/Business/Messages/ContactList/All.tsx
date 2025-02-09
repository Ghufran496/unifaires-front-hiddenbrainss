"use client";
import { Button, Table, Checkbox, Dropdown } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import dp from "@/public/images/avatar/IMG.png";
import { BsThreeDots } from "react-icons/bs";
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

const All = () => {
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
    },
    {
      title: "Profile",
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: () => <Image src={dp} alt="Profile" width={40} height={40} />,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State of Province",
      dataIndex: "stateofprovince",
      key: "stateofprovince",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
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
    },
  ];

  const data = users.map((user, index) => ({
    key: index,
    // profilePicture: "public/images/avatar/user-1.png",
    ...user,
  }));

  return (
    <div className="mt-[147px] md:mt-11 cursor-pointer mb-20">
      <Button
        color="bg-purple"
        className="bg-purple-50 text-white h-12 w-[239.626px]"
      >
        Email Voucher Codes
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        rowClassName="border-2"
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
        className="w-full mt-[55px]"
      />
    </div>
  );
};

export default All;
