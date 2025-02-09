"use client";
import { useContext } from "react";
import { Card } from "antd";
import BasicInfo from "./BasicInfo";
import JobCategories from "./JobCategories";
import { createJobContext } from "./createJobContext";

const CreateJobForm = () => {
  const addJobContext = useContext(createJobContext);
  const steps = [
    {
      title: "Enter Job Details",
      content: <BasicInfo />,
    },
    {
      title: "Categories",
      content: <JobCategories />,
    },
  ];

  return (
    <>
      <Card
        className="mt-8"
        title={steps?.[addJobContext?.steps?.current]?.title}
      >
        <div>{steps?.[addJobContext?.steps?.current]?.content}</div>
      </Card>
    </>
  );
};

export default CreateJobForm;
