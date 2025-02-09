"use client";

import React, { Fragment, useEffect, useState } from "react";
import NextLink from "next/link";
// ant components
import {
  Col,
  Row,
  Form,
  Input,
  Table,
  Select,
  Typography,
  DatePicker,
  message,
  List,
  Button,
  Tabs,
  Spin,
} from "antd";
//interface
// app components
import type { ColumnsType } from "antd/es/table";
// utils and int
import { UserInt } from "@/app/utils/interface";

import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import axios from "axios";
import { DoubleRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { TabsProps } from "antd/lib";
import FilterForm from "./FilterForm";
import axiosInstance from "@/app/utils/axios-config";

interface IUserData extends UserInt {
  ticketId: any;
  severity: any;
  subject: any;
  category: string;
}

const TicketList = ({
  pendingTickets,
  closedTickets,
  setSelectedSeverity,
  setSelectedDay,
}: any) => {
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const router = useRouter();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Open Tickets",
      children: (
        <div>
          <FilterForm
            setSelectedDay={setSelectedDay}
            setSelectedSeverity={setSelectedSeverity}
          />

          <List
            size="large"
            itemLayout="vertical"
            className="[&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
            pagination={{
              pageSize: 5,
            }}
            dataSource={pendingTickets ? pendingTickets : []}
            renderItem={(help: IUserData) => (
              <div key={help.id} className="pb-2">
                <List.Item className="flex gap-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div
                        onClick={() => router.push(`/tickets/${help.ticketId}`)}
                        className="w-full"
                      >
                        <Typography.Paragraph className="text-lg font-bold mb-0">
                          {help?.subject}
                        </Typography.Paragraph>
                        <div className="flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-2 gap-0">
                          <Typography.Paragraph className="italics m-0 italic font-semibold">
                            <DoubleRightOutlined className="pr-2" />
                            <span className="text-purple-400 font-bold">
                              Status:
                            </span>{" "}
                            Pending
                          </Typography.Paragraph>
                          <Typography.Paragraph className="italics m-0 italic font-semibold">
                            <span className="text-purple-400 font-bold ">
                              Severity:
                            </span>{" "}
                            {help.severity}
                          </Typography.Paragraph>
                          <Typography.Paragraph className="italics m-0 italic font-semibold">
                            <span className="text-purple-400 font-bold ">
                              Category:
                            </span>{" "}
                            {help.category}
                          </Typography.Paragraph>
                          <Typography.Paragraph className="italics m-0 italic font-semibold">
                            <span className="text-purple-400 font-bold ">
                              Date Created:
                            </span>{" "}
                            {calculateDaysAgo(help.createdAt)}
                          </Typography.Paragraph>
                        </div>
                      </div>
                      {/* <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                    overlayClassName="p-2 rounded-lg"
                  >
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EllipsisOutlined rotate={90} />}
                      onClick={() => setSelectedHelpId(help.id)}
                    />
                  </Dropdown> */}
                    </div>
                  </div>
                </List.Item>
              </div>
            )}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Closed Tickets",
      children: (
        <div>
          <FilterForm
            setSelectedDay={setSelectedDay}
            setSelectedSeverity={setSelectedSeverity}
          />
          <List
            size="large"
            itemLayout="vertical"
            className="[&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
            pagination={{
              pageSize: 5,
            }}
            dataSource={closedTickets ? closedTickets : []}
            renderItem={(help: IUserData) => (
              <div key={help.id} className="pb-2">
                <List.Item className="flex gap-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div
                        onClick={() => router.push(`/tickets/${help.ticketId}`)}
                        className="w-full"
                      >
                        <Typography.Paragraph className="text-lg font-bold mb-0">
                          {help?.subject}
                        </Typography.Paragraph>
                        <div className="flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-2 gap-0">
                          <Typography.Paragraph className="italics m-0 italic font-semibold">
                            <DoubleRightOutlined className="pr-2" />
                            <span className="text-purple-400 font-bold">
                              Status:
                            </span>{" "}
                            Pending
                          </Typography.Paragraph>
                          <Typography.Paragraph className="italics m-0 italic font-semibold">
                            <span className="text-purple-400 font-bold ">
                              Severity:
                            </span>{" "}
                            {help.severity}
                          </Typography.Paragraph>
                          <Typography.Paragraph className="italics m-0 italic font-semibold">
                            <span className="text-purple-400 font-bold ">
                              Category:
                            </span>{" "}
                            {help.category}
                          </Typography.Paragraph>
                          <Typography.Paragraph className="italics m-0 italic font-semibold">
                            <span className="text-purple-400 font-bold ">
                              Date Created:
                            </span>{" "}
                            {calculateDaysAgo(help.createdAt)}
                          </Typography.Paragraph>
                        </div>
                      </div>
                      {/* <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                    overlayClassName="p-2 rounded-lg"
                  >
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EllipsisOutlined rotate={90} />}
                      onClick={() => setSelectedHelpId(help.id)}
                    />
                  </Dropdown> */}
                    </div>
                  </div>
                </List.Item>
              </div>
            )}
          />
        </div>
      ),
    },
  ];

  function calculateDaysAgo(dateString: any) {
    const givenDate: any = new Date(dateString);
    const currentDate: any = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - givenDate;
    // Calculate the difference in days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    // Return the formatted string
    return `${daysDifference} days ago`;
  }

  return (
    <Fragment>
      <div>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </Fragment>
  );
};

export default TicketList;
