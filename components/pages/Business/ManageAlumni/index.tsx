"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Typography } from "antd";

// app components
import ManageAccountsMenu from "../ManageAccounts/ManageAccountsMenu";
import Container from "@/components/shared/container";
import axios, { AxiosResponse } from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { UserInt } from "@/app/utils/interface";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import AlumniList from "./AlumniList";

const ManageAlumni = () => {
  const { data: session, status } = useSession();
  const [adminList, setAdminList] = useState<UserInt[]>([]);
  const fetchApplications = async () => {
    try {
      const res = await axiosInstance.get("/applications");
      if (res.status) {
        console.log(res.data);
      }
    } catch (error) {
      // handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchApplications();
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
          </div>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <ManageAccountsMenu activeKey="manage-alumni" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <AlumniList />
          {/* <AdminList userData={adminList} /> */}
        </Container>
      </section>
    </Fragment>
  );
};

export default ManageAlumni;
