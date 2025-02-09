"use client";
import React, { Fragment, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Card, Form, Steps, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// app components
import BillingAddress from "./BillingAddress";
import Checkout from "./Checkout";
import Summary from "./Summary";
import Confirm from "./Confirm";

const InvitePayment = ({ inviteList, setInviteList }: any) => {
  // const [form] = Form.useForm();
  const [paymentTypeId, setPaymentTypeId] = useState<any>(null);
  const [selectedCard, setSelectedCard] = useState<any>();
  const [billingAddress, setBillingAddress] = useState<any>();
  const [totalPrice, setTotalPrice] = useState<any>();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Summary",
      content: (
        <Summary
          inviteList={inviteList}
          next={next}
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
          paymentTypeId={paymentTypeId}
          setPaymentTypeId={setPaymentTypeId}
        />
      ),
    },
    {
      title: "Payment",
      content: (
        <Checkout
          next={next}
          prev={prev}
          paymentTypeId={paymentTypeId}
          inviteList={inviteList}
          setInviteList={setInviteList}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      ),
    },
    {
      title: "Billing Address",
      content: (
        <BillingAddress
          next={next}
          prev={prev}
          setBillingAddress={setBillingAddress}
        />
      ),
    },
    {
      title: "Confirm",
      content: (
        <Confirm
          next={next}
          prev={prev}
          billingAddress={billingAddress}
          totalPrice={totalPrice}
          inviteList={inviteList}
          selectedCard={selectedCard}
          setCurrent={setCurrent}
        />
      ),
    },
  ];

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Fragment>
      <Steps
        items={items}
        current={current}
        onChange={onChange}
        percent={((current + 1) / 6) * 100}
      />

      <Card className="mt-8" title={steps[current].title}>
        <div>{steps[current].content}</div>
        <div className="steps-action flex justify-between items-center">
          {current === steps.length - 1 && (
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              className="rounded-md flex items-center"
              onClick={() => message.success("Processing complete!")}
            >
              Save
            </Button>
          )}
        </div>
      </Card>
    </Fragment>
  );
};

export default InvitePayment;
