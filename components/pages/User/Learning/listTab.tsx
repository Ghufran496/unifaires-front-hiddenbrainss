"use client";
import { Card, Typography } from "antd";
import Link from "next/link";
import TabForm from "./components/tabForm";

const MyListTab = () => {
  return (
    <>
      <TabForm />
      <Card className="text-center my-[10%] mx-auto border-none">
        <Typography.Title level={3}>
          Organize and access your courses faster!
        </Typography.Title>
        <Typography.Paragraph>
          <Link href={"/user/my-learning"}>
            <span className="text-purple-50 cursor-pointer">
              Go to the All Courses tab
            </span>
          </Link>
          &nbsp;to create a list.
        </Typography.Paragraph>
      </Card>
    </>
  );
};

export default MyListTab;
