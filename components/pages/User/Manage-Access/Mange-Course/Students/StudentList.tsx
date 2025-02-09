"use client";
import React, { Fragment } from "react";
import Link from "next/link";
// ant components
import {
  Col,
  Tag,
  Row,
  Form,
  Input,
  Table,
  Avatar,
  Select,
  DatePicker,
  Typography,
  Spin,
} from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: number;
  user: {
    email: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
  };
  organization: string;
  completion: number;
  totalEnrollment: number;
  sessionCompleted: number;
  sessionInProgress: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Student",
    dataIndex: "user",
    key: "student",
    render: (_, { user }) => (
      <div className="flex justify-start items-center gap-3">
        <div className="">
          <Typography.Paragraph className="leading-none text-base font-medium mb-1 block text-gray-800">
            {user.firstname}
          </Typography.Paragraph>
          <Typography.Link href={`mailto:${user.email}`}>
            {user.email}
          </Typography.Link>
        </div>
      </div>
    ),
  },
  {
    title: "Progress %",
    dataIndex: "completion",
    key: "progress",
    render: (number) => (
      <Tag color="purple" className="rounded-xl">
        {number}
      </Tag>
    ),
    sorter: (a, b) => a.completion - b.completion,
  },
  {
    title: "Session Completed",
    dataIndex: "sessionCompleted",
    key: "sessionCompleted",
    render: (number) => (
      <Tag color="green" className="rounded-xl">
        {number}
      </Tag>
    ),
    sorter: (a, b) => a.sessionCompleted - b.sessionCompleted,
  },
  {
    title: "Session In Progress",
    dataIndex: "sessionInProgress",
    key: "sessionInProgress",
    sorter: (a, b) => a.sessionInProgress - b.sessionInProgress,
  },
];

const StudentList = ({ allStudent, loading }: any) => {
  const [form] = Form.useForm();
  return (
    <Fragment>
      <Form form={form} className="py-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={10}>
            <Form.Item className="mb-0">
              <Input.Search size="large" placeholder="Search students" />
            </Form.Item>
          </Col>

          <Col xs={12} lg={4}>
            <Form.Item className="mb-0">
              <Select
                showSearch
                size="large"
                placeholder="Filter by"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "Student Full Name",
                    label: "full-name",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Spin spinning={loading}>
          <Table columns={columns} dataSource={allStudent} pagination={false} />
        </Spin>
      </div>
    </Fragment>
  );
};

export default StudentList;
