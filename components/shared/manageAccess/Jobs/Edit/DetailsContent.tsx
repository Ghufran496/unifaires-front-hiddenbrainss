"use client";

import { useContext } from "react";
import { Typography } from "antd";
import { editJobContext } from "./editContext";

const DetailsContent = () => {
  const jobContext = useContext(editJobContext);

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
