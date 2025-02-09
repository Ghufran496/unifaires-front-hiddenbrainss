"use client";
import React, { useContext, useState } from "react";
import { Card, Steps, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BillingAddress from "./BillingAddress";
import Payment from "./Payment";
import Preview from "./Preview";
import BasicInfo from "./BasicInfo";
import ReviewPost from "./ReviewPost";
import JobCategories from "./JobCategories";
import { editJobContext } from "./editContext";

const CreateJobForm = () => {
  const jobContext = useContext(editJobContext);
  const [selectedCard, setSelectedCard] = useState<any>();
  const [billingAddress, setBillingAddress] = useState<any>();
  const [totalPrice, setTotalPrice] = useState<any>();
  const [jobPayment, setJobPayment] = useState();

  const next = () => {
    const stepNo =
      typeof jobContext?.steps?.current === "number"
        ? jobContext.steps.current + 1
        : 0;
    jobContext?.steps?.setCurrent?.(stepNo);
  };
  const prev = () => {
    const stepNo =
      typeof jobContext?.steps?.current === "number"
        ? jobContext.steps.current - 1
        : 0;
    jobContext?.steps?.setCurrent?.(stepNo);
  };
  const steps = [
    {
      title: "Enter Job Details",
      content: <BasicInfo />,
    },
    {
      title: "Categories",
      content: <JobCategories />,
    },
    {
      title: "Preview",
      content: <Preview />,
    },
    {
      title: "Payment",
      content: (
        <Payment
          next={next}
          prev={prev}
          setJobPayment={setJobPayment}
          setTotalPrice={setTotalPrice}
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
      title: "Review Post",
      content: (
        <ReviewPost
          prev={prev}
          billingAddress={billingAddress}
          totalPrice={totalPrice}
          jobPayment={jobPayment}
          selectedCard={selectedCard}
        />
      ),
    },
  ];

  const onChange = (value: number) => {
    if (typeof value !== "number") {
      return;
    }
    jobContext?.steps?.setCurrent(value);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps
        items={items}
        current={jobContext?.steps?.current}
        onChange={onChange}
        percent={
          (((typeof jobContext?.steps?.current === "number"
            ? jobContext.steps.current
            : 0) +
            1) /
            6) *
          100
        }
      />
      <Card className="mt-8" title={steps?.[jobContext?.steps?.current]?.title}>
        <div>{steps[jobContext?.steps?.current].content}</div>
        <div className="steps-action flex justify-between items-center">
          {jobContext?.steps?.current === steps.length - 1 && (
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
    </>
  );
};

export default CreateJobForm;
