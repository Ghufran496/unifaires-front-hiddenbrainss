"use client";
import React, { Fragment, useState } from "react";
// import NextLink from "next/link";
// ant components
import {
  Col,
  Row,
  Form,
  Table,
  Switch,
  Select,
  Button,
  Dropdown,
  Typography,
} from "antd";
// app components
import type { ColumnsType } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/app/utils/axiosError";
import { useParams, useRouter } from "next/navigation";

interface DataType {
  key: number;
  id: string;
  permissionList: string;
  administrator: boolean;
  groupManager: boolean;
  projectManager: boolean;
  user: boolean;
  guest: boolean;
}

const PermissionsList = ({
  allRoles,
  allPermissions,
  userPermissions,
  fetchAllRoles,
  fetchAllPermissions,
  fetchUserInviteDetail,
  userRoles,
}: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const inviteId = params?.inviteId;
  const allPermissionsId =
    userPermissions && userPermissions.map((p: any) => p.id);
  const currentPermissionsId =
    allPermissions &&
    allPermissionsId &&
    allPermissionsId.filter((item: any, index: any) => {
      return allPermissions.indexOf(item) === index;
    });

  const getPermissionStatus = (id: any) => {
    const status =
      userPermissions && userPermissions.find((p: any) => p.id === id);
    // console.log(status);
    return status ? true : false;
  };

  const handlePermissionToggle = async (id: any) => {
    const status = getPermissionStatus(id);
    setLoading(true);
    if (status) {
      try {
        const newPermissionIds = currentPermissionsId.filter(
          (p: any) => p !== id
        );
        const res = await axiosInstance.put(`/invite/${inviteId}`, {
          permissionIds: newPermissionIds,
        });
        if (res.status) {
          toast.success("Permission Removed Successfully");
          fetchUserInviteDetail();
        }
      } catch (error) {
        handleAxiosError(error);
      }
    } else {
      try {
        const newPermissionIds = [...currentPermissionsId, id];
        const res = await axiosInstance.put(`/invite/${inviteId}`, {
          permissionIds: newPermissionIds,
        });
        if (res.status) {
          toast.success("Permission Assigned Successfully");
          fetchUserInviteDetail();
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
    setLoading(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Permission List",
      dataIndex: "title",
      key: "permissionList",
      render: (text) => (
        <Typography.Paragraph className="m-0 capitalize">
          {text.replace(/_/g, " ")}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Access Permission",
      dataIndex: "access",
      key: "access-permission",
      render: (_, { id }) => (
        <Switch
          checked={getPermissionStatus(id)}
          loading={loading}
          onChange={() => handlePermissionToggle(id)}
        />
      ),
    },
  ];
  const currentRoles =
    userRoles &&
    userRoles.map((role: any) => {
      return {
        label: role.title,
        value: role.id,
      };
    });

  const rolesSelectOption =
    allRoles &&
    allRoles.map((role: any) => {
      return {
        label: role.title,
        value: role.id,
      };
    });

  const handleRoleChange = async (value: any) => {
    const currentRoleIds = userRoles && userRoles.map((role: any) => role.id);
    console.log(value);
    setLoading(true);

    try {
      const res = await axiosInstance.put(`/invite/${inviteId}`, {
        roleIds: value,
      });
      if (res.status) {
        toast.success("Role Modified Successfully");
        fetchUserInviteDetail();
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Form form={form} className="pb-6" layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={12} lg={4}>
            <Form.Item label="Roles" className="mb-0">
              <Select
                mode="multiple"
                allowClear
                value={currentRoles}
                showSearch
                size="large"
                placeholder="Select Role"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={handleRoleChange}
                options={rolesSelectOption}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="bg-white rounded-lg mb-6 border overflow-hidden">
        <Table
          columns={columns}
          dataSource={allPermissions}
          className="[&>div>div>ul.ant-table-pagination]:px-6"
        />
      </div>
    </Fragment>
  );
};

export default PermissionsList;
