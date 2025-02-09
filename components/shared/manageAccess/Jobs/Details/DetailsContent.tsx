"use client";
import { useContext } from "react";
import { Typography } from "antd";
import { jobDetailsContext } from "./JobDetailsContext";

const DetailsContent = () => {
  const jobContext = useContext(jobDetailsContext);

  return (
    <div className="mb-8">
      <Typography.Title level={4}>Job Overview</Typography.Title>
      <Typography.Paragraph className="leading-6">
        {jobContext?.jobInfo?.details}
      </Typography.Paragraph>
      <div className="mb-8">
        <Typography.Title level={4}>About Organisation</Typography.Title>
        <Typography.Paragraph className="leading-6">
          {jobContext?.jobInfo?.aboutOrganization}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default DetailsContent;
