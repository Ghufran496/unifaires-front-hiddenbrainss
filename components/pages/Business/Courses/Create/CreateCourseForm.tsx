"use client";
import React, { Fragment, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Card, Form } from "antd";

import CourseLandingPage from "./CourseLandingPage";
import Categories from "./WithVideos/Categories";

const CreateCourseForm = () => {
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
      title: "Course Landing Page",
      content: (
        <CourseLandingPage
          next={next}
          requestBody={requestBody}
          setRequestBody={setRequestBody}
          current={current}
        />
      ),
    },
    {
      title: "Categories",
      content: <Categories prev={prev} requestBody={requestBody} />,
    },
  ];

  return (
    <Fragment>
      <Card className="mt-8" title={steps[current].title}>
        <div className="pb-6">{steps[current].content}</div>
      </Card>
    </Fragment>
  );
};

export default CreateCourseForm;
