"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Typography, Breadcrumb, Pagination } from "antd";

// app components
import Container from "@/components/shared/container";
import ManageAccountsMenu from "@/components/pages/Business/ManageAccounts/ManageAccountsMenu";
import { useSession } from "next-auth/react";
import config from "@/app/utils/config";
import InviteList from "./InviteList";
import axiosInstance from "@/app/utils/axios-config";

const Invitations = () => {
  const { data: session, status } = useSession();
  const [inviteList, setInviteList] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalInvites, setTotalInvites] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const fetchInvites = async (page: any) => {
    try {
      const res = await axiosInstance.get(
        `/invite/business-invites?page=${page}&&limit=${pageSize}`
      );
      if (res.status) {
        const resData = res.data.data;
        setInviteList(resData.invites);
        setTotalInvites(resData.totalItem);
        setCurrentPage(resData.currentPage);
        // console.log(res);
      }
    } catch (error) {
      console.log("Error fetching Invite lits", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchInvites(currentPage);
  }, [currentPage]);

  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/business/manage-accounts">
                Manage Accounts
              </NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Invitations</Breadcrumb.Item>
          </Breadcrumb>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Invitations
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Manage invitations
              </Typography.Paragraph>
            </div>
            <div className="shrink-0 flex gap-2">
              <NextLink
                href="/business/manage-accounts/invitations/create"
                passHref
              >
                <Button type="primary" size="large" className="rounded-md">
                  Invite
                </Button>
              </NextLink>
            </div>
          </div>
        </Container>
      </section>
      {/* <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="invitations" />
        </Container>
      </nav> */}
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <InviteList
            setInviteList={setInviteList}
            inviteList={inviteList}
            fetchInvites={fetchInvites}
            currentPage={currentPage}
          />
          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalInvites}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default Invitations;
