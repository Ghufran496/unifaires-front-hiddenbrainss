"use client";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Select } from "antd";

interface IProp {
  socialMediaList: Array<ISocialMedia>;
  setSocialMediaList: any;
  handleAddSocialAccount: any;
  loading: any;
}

interface ISocialMedia {
  name: string;
  link: string;
}

const AddSocialAccount: React.FC<IProp> = ({
  socialMediaList,
  setSocialMediaList,
  loading,
  handleAddSocialAccount,
}) => {
  const onFinish = (values: any) => {
    const newSocialMedia = values.users;
    handleAddSocialAccount(newSocialMedia);
    // setSocialMediaList([...socialMediaList, ...newSocialMedia]);
  };
  const options = [
    {
      value: "LinkedIn",
      label: "LinkedIn",
    },
    {
      value: "WhatsApp",
      label: "WhatsApp",
    },
    {
      value: "Facebook",
      label: "Facebook",
    },
    {
      value: "Twitter",
      label: "Twitter",
    },
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Form
      name="dynamic_form_nest_item"
      size="large"
      onFinish={onFinish}
      autoComplete="off"
      className="mt-4"
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "name"]}
                  rules={[{ required: true, message: "Select Social Media" }]}
                >
                  <Select
                    placeholder="Select"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "url"]}
                  rules={[{ required: true, message: "Add a Link" }]}
                >
                  <Input placeholder="url" />
                </Form.Item>
                <MinusCircleOutlined
                  onClick={() => {
                    remove(name);
                  }}
                />
              </Space>
            ))}

            <Form.Item>
              <Button
                type="link"
                onClick={() => {
                  add();
                }}
                className="text-purple-50 mt-6"
                icon={
                  <PlusOutlined
                    style={{ color: "#5832DA" }}
                    className="rounded-full p-2 bg-purple-60"
                  />
                }
              >
                Add Social Account
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSocialAccount;
