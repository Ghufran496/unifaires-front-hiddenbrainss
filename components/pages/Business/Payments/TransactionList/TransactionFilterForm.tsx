"use client";

import React from "react";
// ant components
import { Col, DatePicker, Form, Input, Row, Select } from "antd";

const TransactionFilterForm = ({
  setSearchQuery,
  setSelectedStartDate,
  setSelectedEndDate,
  setAccountType,
  setSelectedStatus,
}: any) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const formatDate = (date: any) => {
    const d = new Date(date);
    const month = d.getMonth() + 1; // Months are zero indexed
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleDate = (value: any) => {
    const [start, end] = value;
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);
    // const deadline = [formattedStart, formattedEnd];
    setSelectedStartDate(formattedStart);
    setSelectedEndDate(formattedEnd);
  };

  return (
    <Form form={form} layout="vertical" size="large">
      <div className="flex gap-2 w-full flex-wrap">
        <Form.Item className="mb-0" label="Search Transactions">
          <Input.Search
            size="large"
            placeholder="Search Transaction"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Item>
        <Form.Item className="rounded-lg mb-0 " label="Transaction Date">
          <RangePicker onChange={(value) => handleDate(value)} />
        </Form.Item>
        {/* <Form.Item className="rounded-lg mb-0" label="Account Type">
          <Select
            showSearch
            allowClear
            size="large"
            placeholder="Select Account Type"
            optionFilterProp="children"
            filterOption={(input, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={(value) => setAccountType(value)}
            options={[
              {
                label: "Debit",
                value: "debit",
              },
              {
                label: "Credit",
                value: "credit",
              },
            ]}
            //   onChange={(e) => setCategorySelected(e)}
            style={{
              fontWeight: "medium",
              color: "#000",
              borderBottom: "none",
            }}
          />
        </Form.Item> */}
        <Form.Item className="rounded-lg  mb-0" label="Status">
          <Select
            showSearch
            allowClear
            size="large"
            placeholder="Select Status"
            optionFilterProp="children"
            filterOption={(input, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={(value) => setSelectedStatus(value)}
            options={[
              {
                label: "Successful",
                value: "1",
              },
              // {
              //   label: "Pending",
              //   value: "pending",
              // },
              {
                label: "Failed",
                value: "0",
              },
            ]}
            //   onChange={(e) => setCategorySelected(e)}
            style={{
              fontWeight: "medium",
              color: "#000",
              borderBottom: "none",
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default TransactionFilterForm;
