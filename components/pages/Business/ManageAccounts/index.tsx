"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Typography } from "antd";

// app components
import ManageAccountsMenu from "./ManageAccountsMenu";
import Container from "@/components/shared/container";
import axios, { AxiosResponse } from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { UserInt } from "@/app/utils/interface";
import AssociateUserList from "./AssociateUserList";

const ManageAccounts = () => {
  const { data: session, status } = useSession();
  const [associateList, setAssociateList] = useState<UserInt[]>([]);
  const fetchAdmin = async () => {
    await axios
      .get(`${config.API.API_URL}/associate-user/users`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res: AxiosResponse) => {
        setAssociateList(res.data.data);
      });
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Manage Accounts
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Check out Organisations that are making the most impact on
                Funding, Grants, & Scholarships
              </Typography.Paragraph>
            </div>
            {/* <div className="shrink-0 flex gap-2">
              <NextLink
                href="/admin/manage-accounts/manage-permissions"
                passHref
              >
                <Button type="primary" size="large" className="rounded-md">
                  Manage permissions
                </Button>
              </NextLink>
              <NextLink href="/admin/users/create" passHref>
                <Button type="primary" size="large" className="rounded-md">
                  + Add user
                </Button>
              </NextLink>
            </div> */}
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="in-house-unifaires" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <AssociateUserList userData={associateList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default ManageAccounts;
