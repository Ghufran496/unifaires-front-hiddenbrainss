"use client";
import { Button, Steps } from "antd";
import React, { useState } from "react";
import SetPurchase from "./SetPurchase";
import ConfigureLine from "./ConfigureLine";
import Link from "next/link";
import { ChevronRight } from "react-iconly";

const Step = Steps.Step;

const AddPurchaseOrder = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Set purchases order details",
      content: <SetPurchase />,
    },
    {
      title: "Configure line item",
      content: <ConfigureLine />,
    },
  ];

  return (
    <div className="pl-10 ">
      <div className="mt-10">
        <h1 className="text-[#3F3D56] text-[28px] font-bold">
          Set Purchase Orders & Payment Links
        </h1>
        <div className="flex justify-between w-full mt-6">
          <div className="flex">
            <Link href="#" className="font-semibold text-[14px]">
              <p>Unifaires Billing</p>
            </Link>
            <div className="mt-[2px] px-2">
              <ChevronRight size={18} />
            </div>
            <Link href="#" className="text-purple-50 text-[14px] font-semibold">
              <p>Purchase orders</p>
            </Link>
            <div className="mt-[2px] px-2">
              <ChevronRight size={18} />
            </div>
            <Link href="#" className="text-purple-50 text-[14px] font-semibold">
              <p>Add purchase Order</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Steps className="w-[70%]" current={current}>
          {steps.map((item) => (
            <Step className="block" key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action my-8 flex justify-between items-center">
        {current > 0 && (
          <Button size="large" onClick={() => prev()}>
            Previous
          </Button>
        )}
        <div className="flex justify-end gap-5">
          <div>
            {current == 0 && <Button size="large">Save</Button>}
            {current < steps.length - 1 && (
              <Button
                size="large"
                type="primary"
                className="ml-auto ml-4"
                onClick={() => next()}
              >
                Save and Continue
              </Button>
            )}
          </div>
          {current === steps.length - 1 && (
            <Button
              size="large"
              type="primary"
              // icon={<PlusOutlined />}
              className="rounded-md flex items-center"
              // onClick={handleFinish}
            >
              Submit Purchase Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseOrder;
