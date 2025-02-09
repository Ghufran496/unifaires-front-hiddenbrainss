"use client";
import React, { Fragment, useEffect, useState } from "react";
// next
import NextLink from "next/link";
// antd and Icon components
import { Divider, Breadcrumb, Typography } from "antd";
// app components
import PermissionsList from "./PermissionsList";
import Container from "@/components/shared/container";
import { useParams, useRouter } from "next/navigation";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";

const ManagePermissions = () => {
  const router = useRouter();
  const [inviteDetails, setInviteDetails] = useState<any>();
  const params = useParams();
  const inviteId = params.inviteId;
  const [allRoles, setAllRoles] = useState<any>();
  const [allPermissions, setAllPermissions] = useState<any>();
  const [userPermissions, setUserPermissions] = useState<any>();
  const [userRoles, setUserRoles] = useState<any>();
  const [inviteList, setInviteList] = useState<any>();

  const fetchAllRoles = async () => {
    try {
      const res = await axiosInstance.get("/access-roles/business-roles");

      if (res.status) {
        // toast.success("Permission Fetched Successfully");
        setAllRoles(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const fetchAllPermissions = async () => {
    try {
      const res = await axiosInstance.get(
        "/access-permissions/business-permissions"
      );
      if (res.status) {
        // toast.success("Permission Fetched Successfully");
        setAllPermissions(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const fetchUserInviteDetail = async () => {
    try {
      const res = await axiosInstance.get(`/invite/${inviteId}`);
      if (res.status) {
        const details = res.data.data;
        const businessPermssions = details.permissions;
        const accessRolePermissions = details.roles.flatMap((role: any) => {
          const accessrolepermissions = role.accessrolepermissions;
          const accessPermissions = accessrolepermissions.map(
            (permission: any) => {
              return permission.accesspermission;
            }
          );
          return accessPermissions;
        });
        const combinedPermissions = [
          ...businessPermssions,
          ...accessRolePermissions,
        ];
        setInviteDetails(details);
        setUserPermissions(combinedPermissions);
        setUserRoles(details.roles);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  useEffect(() => {
    if (inviteId) {
      fetchUserInviteDetail();
    }
    fetchAllPermissions();
    fetchAllRoles();
  }, [inviteId]);
  return (
    <Fragment>
      <section className="content-header">
        <Container fluid className="px-6 pt-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/business/manage-accounts">
                Business Invites
              </NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Permissions details</Breadcrumb.Item>
          </Breadcrumb>
          <div className="mt-6">
            <Typography.Title level={2} className="mb-0">
              Manage Permissions
            </Typography.Title>
            <Typography.Paragraph className="mb-0">
              Add to edit permissions for (
              <span className="text-blue-700 font-semibold">
                {inviteDetails?.user?.lastname} {inviteDetails?.user?.firstname}{" "}
                {inviteDetails?.user?.email}
              </span>
              )
            </Typography.Paragraph>
          </div>
        </Container>
      </section>
      <Divider />
      <section className="content-header">
        <Container fluid className="px-6">
          <PermissionsList
            allRoles={allRoles}
            allPermissions={allPermissions}
            fetchAllRoles={fetchAllRoles}
            userPermissions={userPermissions}
            userRoles={userRoles}
            fetchUserInviteDetail={fetchUserInviteDetail}
            // rolesAccessPermissions={rolesAccessPermissions}
            // fetchAccessPermissionRoles={fetchAccessPermissionRoles}
            fetchAllPermissions={fetchAllPermissions}
          />
          {/* <PermissionsList /> */}
        </Container>
      </section>
    </Fragment>
  );
};

export default ManagePermissions;
