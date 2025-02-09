"use client";
import React, { Fragment } from "react";
import NextLink from "next/link";
// ant components
import {
  Col,
  Row,
  Form,
  Input,
  Table,
  Avatar,
  Select,
  Button,
  Dropdown,
  MenuProps,
  Typography,
  DatePicker,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
// app components
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
// utils and int
import { UserInt } from "@/app/utils/interface";

interface DataType extends UserInt {
  key: number;
  url: string;
  surname: string;
  active: boolean;
  firstname: string;
  businessUnit: string;
  applicationDate: Date;
  accountManager: string;
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
    title: "Talent",
    dataIndex: "talent",
    key: "talent",
    render: (_, { id, firstname, surname, email, url }) => (
      <div className="flex justify-start items-center gap-3">
        <Avatar size={40} className="bg-purple-400">
          JB
        </Avatar>
        <div className="">
          <NextLink
            href={`/admin/users/${id}`}
            className="leading-none text-base font-medium mb-1 block text-gray-800"
          >
            {firstname} {surname}
          </NextLink>
          <Typography.Link href={`mailto:${email}`}>{email}</Typography.Link>
        </div>
      </div>
    ),
  },
  {
    title: "Phone number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    render: (_, { phoneNumber }) => (
      <Typography.Link href={`tel:${phoneNumber}`}>
        {phoneNumber}
      </Typography.Link>
    ),
  },
  {
    title: "Account Manager",
    dataIndex: "accountManager",
    key: "accountManager",
  },
  {
    title: "Business Unit",
    dataIndex: "businessUnit",
    key: "businessUnit",
  },
  {
    title: "Application Date",
    dataIndex: "applicationDate",
    key: "applicationDate",
    render: (_, { applicationDate }) => (
      <time>{applicationDate.toDateString()}</time>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "role",
    render: () => (
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
    ),
  },
];
//
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

const TalentList = ({ url = "" }) => {
  const [form] = Form.useForm();

  return (
    <Fragment>
      <Form form={form} className="py-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={10}>
            <Form.Item className="mb-0">
              <Input.Search size="large" placeholder="Search user" />
            </Form.Item>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Item className="mb-0">
              <Select
                size="large"
                showSearch
                placeholder="Sort by"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "organisation",
                    label: "Organisation",
                  },
                  {
                    value: "date-created",
                    label: "Date created",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Item className="mb-0">
              <Select
                showSearch
                size="large"
                placeholder="Filter by"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "User Full Name",
                    label: "full-name",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={6}>
            <Form.Item className="mb-0">
              <DatePicker.RangePicker className="w-full" size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Table
          columns={columns}
          dataSource={userData}
          className="[&>div>div>ul.ant-table-pagination]:px-6"
        />
      </div>
    </Fragment>
  );
};

export default TalentList;
