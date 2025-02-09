"use client";
import React, { Fragment, useState, useContext } from "react";
// next components
import NextLink from "next/link";
// antd components
import {
  Card,
  Form,
  Steps,
  Button,
  Result,
  Divider,
  Modal,
  Typography,
} from "antd";
import { EyeInvisibleOutlined, PlusOutlined } from "@ant-design/icons";
// app components
import Certificates from "./Certificates";
import Pricing from "./Pricing";
import CourseContent from "./CourseContent";
import CourseLandingPage from "./CourseLandingPage";
import Categories from "./Categories";
import router from "next/router";
import Container from "@/components/shared/container";
import { CourseContext } from "../CourseContext";
import PreviewCourse from "./PreveiwCourse";
import FreeCoursePayment from "./FreeCoursePayment";

const CreateCourseForm = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const { courseData, fetchCourseData } = useContext(CourseContext);
  const course = courseData?.data;
  const [creatingCourse, setCreatingCourse] = useState(true);
  const [previewCourse, setPreviewCourse] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isCourseFree =
    course && course?.pricing && course?.pricing.type === "paid" ? false : true;

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = (value: number) => {
    form.validateFields().then(() => {
      setCurrent(value);
    });
  };

  const steps = [
    {
      title: "Landing Page",
      content: <CourseLandingPage />,
    },
    {
      title: "Course Content",
      content: <CourseContent />,
    },
    {
      title: "Categories",
      content: <Categories />,
    },
    {
      title: "Pricing",
      content: <Pricing />,
    },
    {
      title: "Certificate",
      content: <Certificates />,
    },
  ];

  const stepsWithPayment = [
    ...steps,
    {
      title: "Payment",
      content: <FreeCoursePayment />,
    },
  ];

  const items = isCourseFree
    ? stepsWithPayment.map((item: any) => ({
        key: item.title,
        title: item.title,
      }))
    : steps.map((item: any) => ({
        key: item.title,
        title: item.title,
      }));

  const handleSaveCourse = () => {
    setIsModalOpen(true);
    setTimeout(function () {
      router.push("/user/business-access/courses");
    }, 3000);
  };

  const closePreview = () => {
    setCreatingCourse(true);
    setPreviewCourse(false);
  };

  const handleCoursePreview = () => {
    setCreatingCourse(false);
    setPreviewCourse(true);
  };

  return (
    <Fragment>
      {creatingCourse && (
        <div>
          {current !== items.length - 1 && (
            <Button
              size="large"
              type="primary"
              className="flex items-center ml-auto mt-0"
              icon={<PlusOutlined />}
              onClick={() => {
                form.validateFields().then(() => {
                  setCurrent(current + 1);
                });
              }}
            >
              Next
            </Button>
          )}
          <Divider className="mb-6 mt-2" />
          <Steps
            items={items}
            current={current}
            onChange={onChange}
            percent={((current + 1) / items.length) * 100}
          />
          <Card
            className="mt-8"
            title={
              isCourseFree
                ? stepsWithPayment[current].title
                : steps[current].title
            }
          >
            <div className="pb-6">
              {isCourseFree
                ? stepsWithPayment[current].content
                : steps[current].content}
            </div>
            <div className="steps-action flex justify-between items-center">
              {current > 0 && (
                <Button size="large" onClick={() => prev()}>
                  Previous
                </Button>
              )}
              {current < items.length - 1 && (
                <Button
                  size="large"
                  type="primary"
                  className="ml-auto"
                  onClick={() => next()}
                >
                  Next
                </Button>
              )}
              {current === items.length - 1 && (
                <div className="flex flex-row gap-4">
                  <Button
                    size="large"
                    type="primary"
                    icon={<EyeInvisibleOutlined />}
                    className="rounded-md flex items-center"
                    onClick={handleCoursePreview}
                  >
                    Preview
                  </Button>
                  {/* <Button
                    size="large"
                    type="primary"
                    icon={<PlusOutlined />}
                    className="rounded-md flex items-center"
                    onClick={handleSaveCourse}
                  >
                    Save
                  </Button> */}
                </div>
              )}
              <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
              >
                <Result
                  status="success"
                  title="Successfully Created a Course"
                  subTitle="Please wait while we redirect you. OR"
                  extra={[
                    <NextLink key={1} href="/business/courses/create">
                      <Button key="Create">Create Another Course</Button>
                    </NextLink>,
                  ]}
                />
              </Modal>
            </div>
          </Card>
        </div>
      )}
      {previewCourse && (
        <Container>
          <Divider className="mb-6 mt-2" />

          <PreviewCourse closePreview={closePreview} course={course} />
        </Container>
      )}
    </Fragment>
  );
};

export default CreateCourseForm;
