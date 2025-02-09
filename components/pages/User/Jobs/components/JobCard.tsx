"use client";
import React, { Fragment } from "react";
// next
import NextLink from "next/link";
// ants and icons
import { Typography, List, Dropdown, Button, MenuProps, message } from "antd";
import {
  StarFilled,
  BankOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
// interface and props
import { CourseInt } from "@/app/utils/interface";

import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import IconText from "@/components/shared/IconText";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/app/utils/axiosError";

export interface JobCardProps extends CourseInt {}
// props: JobCardProps
const JobCard = ({ job, fetchJob, listType }: any) => {
  const eachJob = job.job;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/enrol-job/${job.id}`);
      if (response.status) {
        fetchJob();
        toast.success("Job deleted successfully");
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("An error occured while deleting the job", error);
      toast.error("An error occured while deleting the job");
    }
  };

  const handleSaveDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/job-wish/${job.id}`);
      if (response.status) {
        fetchJob();
        toast.success("Job deleted successfully");
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("An error occured while deleting the job", error);
      // toast.error("An error occured while deleting the job");
    }
  };

  const handleWithdrawn = async () => {
    try {
      const response = await axiosInstance.put(`/enrol-job/${job.id}`, {
        jobUserStatus: "cancelled",
      });
      if (response.status) {
        fetchJob();
        toast.success("Job Application Cancelled successfully");
      }
    } catch (error) {
      handleAxiosError(error);
      // toast.error("Error occured while Cancelling Application");
    }
  };

  const items: MenuProps["items"] = [
    // {
    //   label: (
    //     <IconText
    //       text="Withdraw"
    //       title="Withdraw"
    //       icon={<IssuesCloseOutlined />}
    //       // className="text-accent-500"
    //     />
    //   ),
    //   key: "withdraw",
    //   onClick: handleWithdrawn,
    // },
    {
      label: (
        <IconText
          text="Delete / Withdraw"
          title="Delete job"
          icon={<DeleteOutlined />}
          className="text-accent-500"
        />
      ),
      key: "delete",
      onClick: listType === "saved" ? handleSaveDelete : handleDelete,
    },
  ];
  return (
    <Fragment>
      <List.Item
        className="flex gap-4 hover:bg-gray-50 cursor-pointer bg-white rounded-md"
        key={`job-item-${job.id}`}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <NextLink
              href={`/user/jobs/${eachJob.slug}`}
              passHref
              target={job.jobUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <Typography.Title ellipsis={{ rows: 2 }} level={5}>
                {eachJob.title || eachJob.position}
              </Typography.Title>
            </NextLink>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottomRight"
              overlayClassName="p-2 rounded-lg"
            >
              <Button
                type="text"
                shape="circle"
                icon={<EllipsisOutlined rotate={90} />}
              />
            </Dropdown>
          </div>
          <Typography.Paragraph
            ellipsis
            className="flex items-center gap-1 mb-1"
          >
            <BankOutlined className="text-grey-400" />
            {eachJob.organizationName}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis
            className="flex items-center gap-1 mb-1"
          >
            {eachJob.location || eachJob.state}
          </Typography.Paragraph>
          {/* <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mb-1">
              <Typography.Text className="pt-1 text-purple-900 cursor-pointer underline">
                10 Applicants
              </Typography.Text>
            </div>
          </div> */}
        </div>
      </List.Item>
    </Fragment>
  );
};

export default JobCard;
