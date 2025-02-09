"use client";
import React, { useContext } from "react";
// next
// antd and Icon components
import { Typography } from "antd";
import { FundingContext } from "../Create/FundingContext";
// app components

const DetailsContent = () => {
  const { fundingData, fetchFundingData } = useContext(FundingContext);

  return (
    <div className="mb-8">
      <Typography.Title level={4}>Job Overview</Typography.Title>
      <Typography.Paragraph className="leading-6">
        {fundingData.data.details}
      </Typography.Paragraph>

      {/* <div className="mb-8">
        <Typography.Title level={4} className="">
          Who is this job for:
        </Typography.Title>
        <ul className="list-disc">
          <li className="ml-4 mb-2">
            Anyone who is interested in learning Javascript from Scratch
          </li>
          <li className="ml-4 mb-2">
            Anyone who is interested in learning Advanced Level Javascript
            concepts
          </li>
          <li className="ml-4 mb-2">
            Anyone who is interested in learning to make Advanced Level
            Applications in Javascript
          </li>
        </ul>
      </div>
      <div className="mb-8">
        <Typography.Title level={4} className="">
          Requirements:
        </Typography.Title>
        <ul className="list-disc">
          <li className="ml-4 mb-2">
            Macintosh (OSX)/ Windows(Vista and higher) Machine
          </li>
          <li className="ml-4 mb-2">Internet connection</li>
        </ul>
      </div>
      <div className="mb-8">
        <Typography.Title level={4} className="">
          What will you learn:
        </Typography.Title>
        <ul className="list-disc">
          <li className="ml-4 mb-2">The basics of HTML and CSS.</li>
          <li className="ml-4 mb-2">
            The core concepts in Javascript & Web development.
          </li>
        </ul>
      </div> */}
      <div className="mb-8">
        <Typography.Title level={4}>About Organisation</Typography.Title>
        <Typography.Paragraph className="leading-6">
          {fundingData.data.aboutOrganization}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default DetailsContent;
