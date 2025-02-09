"use client";
import React, { Fragment, useState } from "react";
import Link from "next/link";
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
  Divider,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
//interface
// app components
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
// utils and int
import { UserInt } from "@/app/utils/interface";

import AdminDetails from "./AdminDetails";

interface IUserData {
  userData: UserInt[];
}

const AssociateUserList = ({ userData }: IUserData) => {
  const [form] = Form.useForm();
  const [adminModal, setAdminModal] = useState(false);
  const [userId, setUserId] = useState<number | undefined>();

  const handleEdit = () => {
    console.log(userId);
    setAdminModal(true);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <IconText text="Edit" title="Edit course" icon={<EditOutlined />} />
      ),
      key: "edit",
      title: "Edit",
      onClick: handleEdit,
    },
    {
      label: (
        <IconText
          text="Share"
          title="Share course"
          icon={<ShareAltOutlined />}
        />
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

  const columns: ColumnsType<UserInt> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_, { id, fullname, email }) => (
        <div className="flex justify-start items-center gap-3">
          <Avatar size={40} className="bg-purple-400">
            JB
          </Avatar>
          <div className="">
            <Link
              href={`/admin/manage-accounts/users/${id}`}
              className="leading-none text-base font-medium mb-1 block text-gray-800"
            >
              {fullname}
            </Link>
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, { roleId }) => <Typography.Text>Admin</Typography.Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Typography.Text className={status ? "text-purple-500" : ""}>
          {status ? "active" : "deactivated"}
        </Typography.Text>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "role",
      render: (_, { id }) => (
        <div className="flex items-center">
          {/* <Link href="/admin/manage-accounts/manage-permissions" passHref>
          <Button>Permissions</Button>
        </Link> */}
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
              onClick={() => setUserId(id)}
            />
          </Dropdown>
        </div>
      ),
    },
  ];

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
      {adminModal && (
        <AdminDetails
          userId={userId}
          adminModal={adminModal}
          setAdminModal={setAdminModal}
        />
      )}
    </Fragment>
  );
};

export default AssociateUserList;
