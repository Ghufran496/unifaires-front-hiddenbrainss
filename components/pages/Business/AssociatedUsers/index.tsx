"use client";
import { Fragment, useEffect, useState } from "react";
import Container from "@/components/shared/container";
import { Button, Divider, Form, Input, Typography } from "antd";
// import PaymentStatCard from "./PaymentStatCard";
// import TransactionList from "./TransactionList";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { UserInt } from "@/app/utils/interface";
import { DownloadOutlined } from "@ant-design/icons";
import AssociatedUserList from "./AssociatedUserList";
import Link from "next/link";
import axiosInstance from "@/app/utils/axios-config";
interface DataType extends UserInt {
  mobileNumber: number;
  name: string;
  startAt: string;
  accessCode: string;
  endAt: string;
  voucher: string;
  user: UserInt;
}

const AssociatedUsersPage = () => {
  const { data: session } = useSession();
  const [associatedUserList, setAssociatedUserList] = useState<Array<DataType>>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAssociates = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/associate-user/users");

      if (res.status) {
        setAssociatedUserList(res.data.data);
      }
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAssociates();
  }, []);

  const filteredUserList =
    associatedUserList &&
    associatedUserList.filter(
      (associate) =>
        associate.user.firstname
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        associate.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Fragment>
      <div className="m-8">
        <Typography.Title>Associated Users</Typography.Title>
        <Typography.Paragraph className="m-0">
          Associated users can access licensed content by logging into Unifaires
          with their Unifaires organization Account
        </Typography.Paragraph>
        <Divider />
        <div>
          <Typography.Paragraph className="font-semibold">
            You currently have {associatedUserList.length} Associated User
          </Typography.Paragraph>
          <div className="flex lg:flex-row flex-col justify-between mt-6">
            <Form
              size="large"
              layout="horizontal"
              className="flex lg:flex-row md:flex-row flex-col mb-2 gap-2"
            >
              <Form.Item label="Find Users by Name or Email">
                <Input
                  placeholder="Search Users name or Email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Item>
              {/* <Button type="primary">Search</Button> */}
            </Form>
            <div className="flex lg:flex-row md:flex-row mb-4 flex-col gap-2">
              {/* <Button type="primary" size="large" icon={<DownloadOutlined />}>
                Download Associated User
              </Button> */}
              <Link href="/business/associated-users/invite">
                <Button type="primary" size="large">
                  Add Associated User
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="m-8">
        <AssociatedUserList
          loading={loading}
          associatedUserList={filteredUserList}
          fetchAssociateList={fetchAssociates}
        />
      </div>
    </Fragment>
  );
};
export default AssociatedUsersPage;
