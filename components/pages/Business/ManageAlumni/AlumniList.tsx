"use client";
import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import type { TableColumnsType } from "antd";
import form from "antd/es/form";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data: DataType[] = [];
for (let i = 0; i < 15; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const FacilitatorApplicationList: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Form form={form} className="pt-6 pb-2">
        <Typography.Title level={4}>
          List of Mentors & Facilitators
        </Typography.Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={10}>
            <Form.Item className="mb-0">
              <Input.Search size="middle" placeholder="Search user" />
            </Form.Item>
          </Col>
          <div style={{ marginBottom: 4 }} className="flex ml-auto">
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
              className="flex text-white ml-auto items-center bg-red-600"
            >
              Delete
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
        </Row>
      </Form>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default FacilitatorApplicationList;
