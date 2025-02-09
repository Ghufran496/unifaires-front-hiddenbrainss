"use client";

import { useState } from "react";
import { Card, Form } from "antd";
import FundingBasicInfo from "./FundingBasicInfo";
import FundingCategories from "./Steps/FundingCategories";

const CreateFundingForm = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [requestBody, setRequestBody] = useState();

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Enter Job Details",
      content: (
        <FundingBasicInfo
          next={next}
          requestBody={requestBody}
          setRequestBody={setRequestBody}
          current={current}
        />
      ),
    },
    {
      title: "Categories",
      content: <FundingCategories prev={prev} requestBody={requestBody} />,
    },
  ];

  return (
    <>
      <Card className="mt-8" title={steps?.[current]?.title}>
        <div>{steps?.[current]?.content}</div>
      </Card>
    </>
  );
};

export default CreateFundingForm;
