"use client";
import React, { Fragment, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Card, Form, Steps, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// app components
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
    <Fragment>
      <Fragment>
        <Card className="mt-8" title={steps[current].title}>
          <div>{steps[current].content}</div>
        </Card>
      </Fragment>
    </Fragment>
  );
};

export default CreateFundingForm;
