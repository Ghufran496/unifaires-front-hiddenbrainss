"use client";
import { useState } from "react";
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
    <>
      <Card className="mt-8" title={steps[current].title}>
        <div className="pb-6">{steps[current].content}</div>
      </Card>
    </>
  );
};

export default CreateCourseForm;
