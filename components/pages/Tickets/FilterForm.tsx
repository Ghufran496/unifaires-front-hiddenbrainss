"use client";

import React from "react";
// ant components
import { Col, DatePicker, Form, Input, Row, Select } from "antd";

const FilterForm = ({ setSelectedSeverity, setSelectedDay }: any) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="flex gap-2">
      <Form.Item className="rounded-lg w-full" name="categories">
        <Select
          showSearch
          allowClear
          size="large"
          placeholder="Severity"
          optionFilterProp="children"
          filterOption={(input, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onChange={(value) => setSelectedSeverity(value)}
          options={[
            {
              label: "High",
              value: "high",
            },
            {
              label: "Medium",
              value: "medium",
            },
            {
              label: "Low",
              value: "low",
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
      <Form.Item className="rounded-lg w-full" name="date">
        <Select
          showSearch
          allowClear
          size="large"
          placeholder="Days"
          optionFilterProp="children"
          filterOption={(input, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onChange={(value) => setSelectedDay(value)}
          options={[
            {
              label: "10 Days Ago",
              value: "10",
            },
            {
              label: "20 Days Ago",
              value: "20",
            },
            {
              label: "30 Days Ago",
              value: "30",
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
    </Form>
  );
};

export default FilterForm;
