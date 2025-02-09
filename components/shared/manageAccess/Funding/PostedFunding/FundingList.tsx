"use params";
import React, { Fragment } from "react";
import NextLink from "next/link";
// ant components
import {
  Table,
  Avatar,
  Button,
  Divider,
  Dropdown,
  MenuProps,
  Typography,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
// app components
import FundingSearchForm from "./FundingSearchForm";
import IconText from "@/components/shared/IconText";
// utils, mock data and int
import { FundingInt } from "@/app/utils/interface";

export const userData: any[] = Array.from({ length: 20 }).map((_, index) => ({
  url: "",
  key: index,
  avatar: "",
  surname: "Brown",
  firstname: "John",
  fullname: "John Brown",
  id: index,
  roleId: 1,
  status: true,
  role: "Instructor",
  active: index % 2 === 0,
  businessUnit: "Software Engineer",
  phoneNumber: `+2340903355449${index}`,
  email: `john.brown${index}@gmail.com`,
  applicationDate: new Date("August 19, 2022 23:15:30"),
  accountManager: "Mesas Crop",
}));

interface DataType extends FundingInt {
  key: number;
  url: string;
}

const items: MenuProps["items"] = [
  {
    label: <IconText text="Edit" title="Edit course" icon={<EditOutlined />} />,
    key: "edit",
  },
  {
    label: (
      <IconText text="Share" title="Share course" icon={<ShareAltOutlined />} />
    ),
    key: "share",
  },
  {
    label: (
      <IconText
        text="Delete"
        title="Delete course"
        icon={<DeleteOutlined />}
        className="text-accent-500"
      />
    ),
    key: "delete",
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: "Organisation",
    dataIndex: "organisation",
    key: "organisation",
    render: (_, { id, name, url, author }) => (
      <div className="flex justify-start items-center gap-3">
        <Avatar size={40} className="bg-purple-400">
          JB
        </Avatar>
        <div className="">
          <NextLink href={`/admin/${url}/funding/${id}`}>
            <a className="leading-none text-base font-medium mb-1 block text-gray-800">
              {name}
            </a>
          </NextLink>
          <Typography.Paragraph className="mb-0">
            <Typography.Text className=" text-gray-500">
              Author:{" "}
            </Typography.Text>
            {author.fullname}
          </Typography.Paragraph>
        </div>
      </div>
    ),
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
    render: (_, { phoneNumber, email, address }) => (
      <Fragment>
        <address className="mb-0">
          <Typography.Paragraph ellipsis className="mb-0 w-64">
            <Typography.Text className=" text-gray-500">
              Address:{" "}
            </Typography.Text>
            {address}
          </Typography.Paragraph>
        </address>
        <Typography.Link href={`tel:${phoneNumber}`}>
          {phoneNumber}
        </Typography.Link>{" "}
        | <Typography.Link href={`mailto:${email}`}>{email}</Typography.Link>
      </Fragment>
    ),
  },
  {
    title: "Applicants",
    dataIndex: "applicants",
    key: "applicants",
  },
  {
    title: "Views",
    dataIndex: "views",
    key: "views",
    render: (_, { views }) => (
      <Typography.Text>
        <IconText text={views} title="Views" icon={<EyeOutlined />} />
      </Typography.Text>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "role",
    render: () => (
      <div className="flex items-center">
        <Divider type="vertical" />
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          placement="bottomRight"
          overlayClassName="p-2 rounded-lg"
        >
          <Button
            type="text"
            shape="circle"
            className="grid place-items-center"
            icon={<EllipsisOutlined rotate={90} />}
          />
        </Dropdown>
      </div>
    ),
  },
];

//
const fundingData: any[] = Array.from({ length: 20 }).map((_, index) => ({
  key: index,
  avatar: "",
  id: String(index),
  address: "Cologne, Germany",
  views: index * 3,
  applicants: index * 2,
  author: userData[index],
  name: "Agriculture, Food & Rural Development",
  email: `john.brown${index}@gmail.com`,
  phoneNumber: `+2340903355449${index}`,
  url: "",
}));

const FundingList = () => {
  // const [form] = Form.useForm();

  return (
    <Fragment>
      <FundingSearchForm />
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Table
          columns={columns}
          dataSource={fundingData}
          className="[&>div>div>ul.ant-table-pagination]:px-6"
        />
      </div>
    </Fragment>
  );
};

export default FundingList;
