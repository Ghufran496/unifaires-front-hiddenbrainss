"use client";
import React, { Fragment } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Divider, Typography } from "antd";
// app components
import UserList from "./UserList";
import Container from "@/components/shared/container";
import { UserInt } from "@/app/utils/interface";

interface IAllUsers {
  allUsers: Array<UserInt>;
}

const Users = ({ allUsers }: IAllUsers) => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid px-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="">
                All Users
              </Typography.Title>
            </div>
            <NextLink href="/admin/users/create" passHref>
              <Button type="primary" size="large" className="rounded-md">
                + Add user
              </Button>
            </NextLink>
          </div>
        </Container>
      </section>
      <Divider className="my-0" />
      <section className="content-body">
        <Container className="container-fluid px-6 pb-6">
          <UserList userData={allUsers} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Users;
