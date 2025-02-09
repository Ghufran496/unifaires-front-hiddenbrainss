"use client";
import { Form, Input } from "antd";
import React from "react";

const SetPurchase = () => {
  return (
    <div>
      <div className="border rounded-t-2xl mt-10">
        <h1 className="py-4 px-4 rounded-t-2xl bg-[#E9ECEF] font-bold">
          Set purchase order details Info
        </h1>
        <p className="w-4/5 px-4 mt-4 mb-4">
          You can add your purchase order details and configure line items. your
          billing address and payment terms are indicated for your reference.
        </p>
        <div>
          <Form>
            <div className="lg:grid grid-cols-3 gap-5 px-4">
              <Form.Item>
                <label>Purchase order Id</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Bill From</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Bill To</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Address Line 1</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Address Line 2 - optional</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>City</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>State - optional</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Postal code</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Bill To</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Payment terms</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Currency</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Effective month</label>
                <Input type="date" />
              </Form.Item>
              <Form.Item>
                <label>Expiration month</label>
                <Input type="date" />
              </Form.Item>
              <Form.Item>
                <label>Description</label>
                <Input.TextArea />
              </Form.Item>
            </div>
            <h1 className="py-4 px-4 rounded-t-2xl mt-4 bg-[#E9ECEF] font-bold">
              Purchase order contact - optional info
            </h1>
            <div className="grid grid-cols-3 gap-5 px-4 mt-6">
              <Form.Item>
                <label>Name</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Email</label>
                <Input />
              </Form.Item>
              <Form.Item>
                <label>Phone</label>
                <Input />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SetPurchase;
