"use client";

import React from "react";
import { Checkbox, Form, Input, Select } from "antd";

const ConfigureLine = () => {
  return (
    <div>
      <div className="border rounded-t-2xl mt-10">
        <h1 className="py-4 px-4 rounded-t-2xl bg-[#E9ECEF] font-bold">
          Line Item
        </h1>
        <p className="w-4/5 px-4 mt-4 mb-4">
          You can add your purchase order details and configure line items. your
          billing address and payment terms are indicated for your reference.
        </p>
        <div>
          <Form>
            <div className="lg:grid grid-cols-3 gap-5 px-4">
              <Form.Item>
                <label>Line item number</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Line item type</label>

                <Select
                  showSearch
                  placeholder="Last 3 Months"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "last-3-months",
                      label: "Last 3 Months",
                    },
                    {
                      value: "last-month",
                      label: "Last Month",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item>
                <label>Start month</label>
                <Input type="date" />
              </Form.Item>
              <Form.Item>
                <label>End month</label>
                <Input type="date" />
              </Form.Item>
              <Form.Item>
                <label>Description</label>
                <Input.TextArea />
              </Form.Item>
            </div>
            <h1 className="py-4 px-4 font-bold">
              Balance tracking - optional Info
            </h1>
            <p className="pt-2 px-4 w-[70%]">
              Balance tracking lets you track your cost against your purchase
              order line item amount.
            </p>
            <div className="grid grid-cols-3 gap-5 px-4 mt-6">
              <Form.Item>
                <Checkbox checked>Enable balance tracking</Checkbox>
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-5 px-4 mt-3">
              <Form.Item>
                <label>Amount</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Quantity</label>
                <Input />
              </Form.Item>

              <Form.Item>
                <label>Tax - optional</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Tax type</label>
                <Input />
              </Form.Item>
            </div>
            <div className="flex ml-2">
              <div className=" pr-10 pl-2 py-2">
                <p className="font-bold">Total value</p>
                <p className="text-[14px] mt-1">$0.00</p>
              </div>
              <div className="border-l pr-10 pl-2 py-2">
                <p className="font-bold">Total Tax</p>
                <p className="text-[14px] mt-1">$0.00</p>
              </div>
              <div className="border-l pr-10 pl-2 py-2">
                <p className="font-bold">Line item total</p>
                <p className="text-[14px] mt-1">$0.00</p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ConfigureLine;
