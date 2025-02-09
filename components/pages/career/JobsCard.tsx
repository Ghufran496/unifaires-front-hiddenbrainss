"use client";

import React, { Fragment, useEffect, useState } from "react";
// ants and icons
import { Button, Card, Typography } from "antd";
import { BankOutlined, ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
// app components
import ImageComponent from "@/components/shared/image";
// interface and props
import Link from "next/link";

const JobsCard = (props: any) => {
  const [deadlineColor, setDeadlineColor] = useState("");
  const [jobStatus, setJobStatus] = useState("");

  function parseJSONIfValid(str: any) {
    if (!str) {
      return [];
    }
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      // return str;
      return [str];
    }
  }
  const workingStyle: Array<any> =
    props && parseJSONIfValid(props.workingStyle);
  // const jobSkills = props && props?.skills;

  useEffect(() => {
    //console.log("Image URL:", props.mediaUrl || props.organizationLogo);
    function getJobStatus() {
      if (props.appDeadlineType === "Anytime") {
        setDeadlineColor("green");
        return "Active"
      }

      const deadline = new Date(props.deadlineEnd).getTime(); // Get timestamp of deadline
      const currentDate = new Date().getTime(); // Get timestamp of current date

      // Calculate the difference in time (in milliseconds)
      const timeDiff = deadline - currentDate;

      // Convert the time difference from milliseconds to days
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      // Check conditions and return appropriate message
      if (daysDiff > 30) {
        setDeadlineColor("green");
        return "Active";
      } else if (daysDiff > 0 && daysDiff <= 30) {
        setDeadlineColor("orange");
        return `${daysDiff} Days Left`;
      } else if (daysDiff === 0) {
        setDeadlineColor("red");
        return "Expires Today";
      } else {
        setDeadlineColor("red");
        return "Expired";
      }
    }

    const status = getJobStatus();
    setJobStatus(status);
  }, [props.deadlineEnd])

  return (
    <Fragment>
      <Link href={`/career/${props.slug}`} passHref>
        <Card
          className="h-full w-full rounded-md overflow-hidden mb-1 [&>div.ant-card-body]:p-0 mb-3"
          hoverable
        >
          <div className="flex flex-row gap-2 w-full ">
            <div className="flex justify-start items-start p-2 rounded-xl">
              <ImageComponent
                width={100}
                height={100}
                // layout="fill"
                src={props.mediaUrl || props.organizationLogo}
                alt="job image"
                objectPosition="center"
              />
            </div>
            <div className="p-2 lg:w-2/3 md:2/3 w-3/4">
              <Typography.Paragraph ellipsis={{ rows: 2 }} className="capitalize text-[14px] m-0 font-bold">
                {props.position || props.title}
              </Typography.Paragraph>

              <Typography.Paragraph ellipsis className="flex items-center gap-1 mb-1">
                <BankOutlined className="text-purple-300 pr-2 font-semibold" />{" "}
                {props.company ? props.company : props.organizationName}
              </Typography.Paragraph>

              <Typography.Paragraph ellipsis={{ rows: 2 }} className="flex items-center gap-1 mb-1">
                <EnvironmentOutlined className="text-purple-300 pr-2 font-semibold" />
                {`${props.location || `${props.state}, ${props.country}`}`}
              </Typography.Paragraph>

              <Typography.Paragraph ellipsis className="flex items-center gap-1 mb-1" style={{ color: deadlineColor }} >
                <ClockCircleOutlined className="text-purple-300 pr-2 font-semibold" />
                {jobStatus}
              </Typography.Paragraph>

              <div className="flex gap-2 ">
                {workingStyle &&
                  workingStyle.map((style: any, index: number) => (
                    <Button
                      key={index}
                      size="small"
                      shape="round"
                      className="text-purple-50 border-none bg-[#E3E2F4]"
                    >
                      {style}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </Fragment>
  );
};

export default JobsCard;
