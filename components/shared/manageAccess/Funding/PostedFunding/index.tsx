"use client";
import React, { Fragment } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Button, Typography } from "antd";
// app components
import FundingList from "./FundingList";
import FundingMenu from "../List/FundingMenu";
import FundingStats from "../Statistics/FundingStats";
import Container from "@/components/shared/container";

const PostedFunding = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid px-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="">
                My Funding
              </Typography.Title>
              <Typography.Paragraph className="">
                Check out Organisations that are making the most impact on
                Funding, Grants, & Scholarships
              </Typography.Paragraph>
            </div>
            <NextLink href="/admin/funding/create" passHref>
              <Button type="primary" size="large" className="rounded-md">
                + Add funding
              </Button>
            </NextLink>
          </div>
        </Container>
      </section>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <FundingStats />
        </Container>
      </section>
      <nav className="">
        <Container className="px-6 container-fluid">
          <FundingMenu />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="container-fluid px-6 pb-6">
          <FundingList />
        </Container>
      </section>
    </Fragment>
  );
};

export default PostedFunding;
