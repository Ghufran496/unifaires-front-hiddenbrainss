"use client";
import React, { Fragment } from "react";
import NextLink from "next/link";
// ant components
import {
  Col,
  Row,
  Form,
  Input,
  Table,
  Avatar,
  Select,
  MenuProps,
  Typography,
  DatePicker,
  Button,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
//interface
// app components
import type { ColumnsType } from "antd/es/table";
import IconText from "@/components/shared/IconText";
// utils and int
import { UserInt } from "@/app/utils/interface";

interface DataType extends UserInt {
  completed: string;
  paymentType: string;
  date: string;
  price: number;
  plan: IPlan;
  user: UserInt;
}

interface IPlan {
  id: string;
  createdAt: string;
  price: string;
  title: string;
}

interface IProp {
  transactionList: Array<DataType>;
}

const TransactionList = ({ transactionList }: IProp) => {
  const [form] = Form.useForm();

  // const items: MenuProps["items"] = [
  //   {
  //     label: (
  //       <IconText text="Edit" title="Edit course" icon={<EditOutlined />} />
  //     ),
  //     key: "edit",
  //     title: "Edit",
  //   },
  //   {
  //     label: (
  //       <IconText
  //         text="Share"
  //         title="Share course"
  //         icon={<ShareAltOutlined />}
  //       />
  //     ),
  //     key: "share",
  //   },
  //   {
  //     label: (
  //       <IconText
  //         text="Delete"
  //         title="Delete course"
  //         icon={<DeleteOutlined />}
  //         className="text-accent-500"
  //       />
  //     ),
  //     key: "delete",
  //   },
  // ];

  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (_, { plan }) => (
        <div className="flex justify-start items-center gap-3">
          <div className="">
            <NextLink
              href={"#"}
              className="leading-none font-medium mb-1 block text-gray-800"
            >
              {plan?.title}
            </NextLink>
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, { plan }) => (
        <Typography.Paragraph>
          {formatDate(plan?.createdAt)}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Successful", value: "successull" },
        { text: "Pending", value: "pending" },
      ],
      render: (_, { status }) => (
        <Typography.Text
          className={
            !status
              ? "text-white p-2 bg-green-600 rounded-md px-4"
              : "text-white p-2 bg-orange-600 rounded-md px-4"
          }
        >
          {!status ? "Successful" : "pending"}
        </Typography.Text>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: true,
      render: (_, { plan }) => (
        <Typography.Text>${plan?.price}</Typography.Text>
      ),
    },
    // {
    //   title: "Payment Type",
    //   dataIndex: "paymentType",
    //   key: "paymentType",
    //   render: (_, { paymentType }) => (
    //     <div>
    //       <div className="flex flex-row">
    //         <Button type="default" size="middle" className="rounded-sm">
    //           Recipt
    //         </Button>
    //         <Button type="default" size="middle" className="rounded-sm">
    //           Invoice
    //         </Button>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  return (
    <Fragment>
      {/* <Form form={form} className="py-6">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={10}>
            <Form.Item className="mb-0">
              <Input.Search size="large" placeholder="Search user" />
            </Form.Item>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Item className="mb-0">
              <Select
                size="large"
                showSearch
                placeholder="Sort by"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "organisation",
                    label: "Organisation",
                  },
                  {
                    value: "date-created",
                    label: "Date created",
                  },
                ]}
              />
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
                    value: "User Full Name",
                    label: "full-name",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={6}>
            <Form.Item className="mb-0">
              <DatePicker.RangePicker className="w-full" size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Form> */}
      <div className="bg-white rounded-lg pb-3 border overflow-hidden">
        <Table
          columns={columns}
          dataSource={transactionList}
          className="[&>div>div>ul.ant-table-pagination]:px-6"
        />
      </div>
    </Fragment>
  );
};

export default TransactionList;
