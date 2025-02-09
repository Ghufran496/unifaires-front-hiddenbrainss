"use client";
import React from "react";
// ant components
import { Col, DatePicker, Form, Input, Row, Select } from "antd";

const CollectionSearchForm = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="py-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          <Form.Item className="mb-0">
            <Input.Search size="large" placeholder="Search your course" />
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
                  value: "date-created",
                  label: "Date created",
                },
                {
                  value: "recently-accessed",
                  label: "Recently Accessed",
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
                  value: "all",
                  label: "All",
                },
                {
                  value: "organisation",
                  label: "Organisation",
                },
                {
                  value: "instructor",
                  label: "Instructor",
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
    </Form>
  );
};

export default CollectionSearchForm;
