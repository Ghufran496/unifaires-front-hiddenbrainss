"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  Table,
  Select,
  Button,
  Dropdown,
  MenuProps,
  Typography,
  Divider,
  Spin,
} from "antd";
import {
  ControlOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import Link from "next/link";

interface DataType {
  key: number;
  url: string;
  status: string;
  email: string;
  id: string;
  user: any;
  roles: any;
}

const InviteList = ({
  inviteList,
  fetchInvites,
  setInviteList,
  currentPage,
}: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inviteId, setInviteId] = useState<any>();
  const [filteredInviteList, setFilteredInviteList] = useState(inviteList);
  const [form] = Form.useForm();

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/invite/${inviteId}`);
      if (res.status) {
        toast.success("Invite Deleted Successfully");
        fetchInvites(currentPage);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <IconText
          text="Manage Permission"
          title="Manage Permission"
          icon={<ControlOutlined />}
          className="text-base text-blue-700 font-bold"
        />
      ),
      key: "permission",
      onClick: () =>
        router.push(`/business/manage-accounts/manage-permissions/${inviteId}`),
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete course"
          icon={<DeleteOutlined />}
          className="text-base text-accent-500"
        />
      ),
      key: "delete",
      onClick: handleDelete,
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Email",
      dataIndex: "ownerDetails",
      key: "user",
      render: (_, { user }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <Typography.Paragraph className="leading-none text-base font-medium mb-1 block text-gray-800">
              {user?.firstname} {user?.lastname}
            </Typography.Paragraph>
            <Typography.Link href={`mailto:${user?.email}`}>
              {user?.email}
            </Typography.Link>
          </div>
        </div>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (_, { roles }) => (
        <div className="">
          {roles.map((role: any) => {
            return <span key={role.id}>{role.title},</span>;
          })}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Button
          size="middle"
          className={`${
            status === "pending"
              ? "bg-orange-400"
              : status === "rejected"
              ? "bg-red-600"
              : "bg-green-700"
          } capitalize text-white font-semibold  rounded-full border-none`}
        >
          {status}
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "role",
      render: (_, { id }) => (
        <div className="flex items-center justify-center">
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
              onClick={() => setInviteId(id)}
            />
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleFilter = async (filterValue: any) => {
    if (filterValue === "all") {
      fetchInvites(1);
    } else {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/invite/business-invites?status=${filterValue}`
        );
        if (res.status) {
          console.log("here is the filtered value", res);
          const resData = res.data.data;
          setInviteList(resData.invites);
          setFilteredInviteList(resData.invites);
        }
      } catch (error) {
        console.log("Error fetching Invite list", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearchInvite = (value: any) => {
    const searchTerm = value.toLowerCase();
    const filteredList = inviteList.filter((applicant: any) => {
      const fullName = `${applicant.user.firstname.toLowerCase()} ${applicant.user.lastname.toLowerCase()}`;
      return (
        fullName.includes(searchTerm) ||
        applicant.user.email.toLowerCase().includes(searchTerm) ||
        applicant.status.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredInviteList(filteredList);
  };

  useEffect(() => {
    setFilteredInviteList(inviteList);
  }, [inviteList]);

  return (
    <Fragment>
      <Form form={form} className="py-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={10}>
            <Form.Item className="mb-0">
              <Input.Search
                size="large"
                placeholder="Search user"
                onSearch={handleSearchInvite}
                onChange={(e) => handleSearchInvite(e.target.value)}
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
                onChange={handleFilter}
                options={[
                  {
                    value: "all",
                    label: "All",
                  },
                  {
                    value: "accepted",
                    label: "Accepted",
                  },
                  {
                    value: "rejected",
                    label: "Rejected",
                  },
                  {
                    value: "pending",
                    label: "Pending",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Spin tip="Loading" size="large" spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredInviteList}
            className="[&>div>div>ul.ant-table-pagination]:px-6"
            pagination={false}
          />
        </Spin>
      </div>
    </Fragment>
  );
};

export default InviteList;
