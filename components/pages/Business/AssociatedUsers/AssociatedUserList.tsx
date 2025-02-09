"use client";
import React, { Fragment, useState } from "react";
// ant components
import { Button, Form, Spin, Table, Typography } from "antd";
//interface
// app components
import type { ColumnsType } from "antd/es/table";
// utils and int
import { UserInt } from "@/app/utils/interface";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { LoadingOutlined } from "@ant-design/icons";

interface DataType extends UserInt {
  mobileNumber: number;
  name: string;
  startAt: string;
  accessCode: string;
  endAt: string;
  voucher: string;
  user: UserInt;
}

interface IProp {
  associatedUserList: Array<DataType>;
  fetchAssociateList: any;
  loading: any;
}

const AssociatedUserList = ({
  associatedUserList,
  fetchAssociateList,
  loading,
}: IProp) => {
  const [form] = Form.useForm();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const deleteAssociate = async (id: any) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await axiosInstance.delete(`/associate-user/${id}`).then((res) => {
        fetchAssociateList();
        showSuccess("User Deleted successfully");
      });
    } catch (error) {
      console.log(error);
      handleAxiosError(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { user }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <Typography.Paragraph className="leading-none text-base font-medium mb-1 block text-gray-800">
              {user.firstname} {user.lastname}
            </Typography.Paragraph>
            <Typography.Link href={`mailto:${user.email}`}>
              {user.email}
            </Typography.Link>
          </div>
        </div>
      ),
    },

    {
      title: "Access Code",
      dataIndex: "accessCode",
      key: "accessCode",
      render: (_, { voucher }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <Typography.Paragraph className="text-purple-600">
              {voucher}
            </Typography.Paragraph>
          </div>
        </div>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (_, { endAt }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <Typography.Paragraph className="text-purple-600">
              {formatDate(endAt)}
            </Typography.Paragraph>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, { id }) => (
        <Button
          size="middle"
          type="primary"
          onClick={() => deleteAssociate(id)}
          loading={loadingStates[id] || false}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined className="flex items-center justify-center text-5xl " />
          }
        >
          <Table
            columns={columns}
            dataSource={associatedUserList}
            className="[&>div>div>ul.ant-table-pagination]:px-6"
          />
        </Spin>
      </div>
    </Fragment>
  );
};

export default AssociatedUserList;
