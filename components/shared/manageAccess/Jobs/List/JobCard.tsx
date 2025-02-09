"use client";

import { useContext } from "react";
import NextLink from "next/link";
import { Typography, List, Dropdown, Button, MenuProps, Tag } from "antd";
import {
  BankOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import { JobListContext } from "./JobListContext";

const JobCard = ({ job }: any) => {
  const jobContextValue = useContext(JobListContext);

  /**
   * Get active menu items
   */
  const getActiveMenuItems = () => {
    const result: MenuProps["items"] = [];

    if (jobContextValue?.permissions?.job_edit) {
      result.push({
        label: (
          <IconText text="Edit" title="Edit job" icon={<EditOutlined />} />
        ),
        key: "edit",
        onClick: () => {
          if (jobContextValue?.handleEditJob) {
            jobContextValue.handleEditJob(job?.id);
          }
        },
      });
    }
    if (jobContextValue?.permissions?.job_edit) {
      result.push({
        label: (
          <IconText
            text="Archive"
            title="Archive job"
            icon={<SaveOutlined />}
          />
        ),
        key: "archive",
        onClick: () => {
          if (jobContextValue?.handleArchiveJob) {
            jobContextValue.handleArchiveJob(job?.id);
          }
        },
      });
    }
    if (jobContextValue?.permissions?.job_delete) {
      result.push({
        label: (
          <IconText
            text="Delete"
            title="Delete job"
            icon={<DeleteOutlined />}
            className="text-accent-500"
          />
        ),
        key: "delete",
        onClick: () => {
          if (jobContextValue?.handleDeleteJob) {
            jobContextValue.handleDeleteJob(job?.id);
          }
        },
      });
    }

    return result;
  };

  /**
   * Get active menu items
   */
  const getArchieveMenuItems = () => {
    const result: MenuProps["items"] = [];

    if (jobContextValue?.permissions?.job_edit) {
      result.push({
        label: (
          <IconText text="Edit" title="Edit job" icon={<EditOutlined />} />
        ),
        key: "edit",
        onClick: () => {
          if (jobContextValue?.handleEditJob) {
            jobContextValue.handleEditJob(job?.id);
          }
        },
      });
    }
    if (jobContextValue?.permissions?.job_edit) {
      result.push({
        label: (
          <IconText
            text="Unarchive"
            title="Unarchive job"
            icon={<SaveOutlined />}
          />
        ),
        key: "open",
        onClick: () => {
          if (jobContextValue?.handleUnArchiveJob) {
            jobContextValue.handleUnArchiveJob(job?.id);
          }
        },
      });
    }
    if (jobContextValue?.permissions?.job_delete) {
      result.push({
        label: (
          <IconText
            text="Delete"
            title="Delete"
            icon={<DeleteOutlined />}
            className="text-accent-500"
          />
        ),
        key: "delete",
        onClick: () => {
          if (jobContextValue?.handleDeleteJob) {
            jobContextValue.handleDeleteJob(job?.id);
          }
        },
      });
    }

    return result;
  };

  /**
   * Get pending menu items
   */
  const getPendingMenuItems = () => {
    const result: MenuProps["items"] = [];

    if (jobContextValue?.permissions?.job_edit) {
      result.push({
        label: (
          <IconText text="Edit" title="Edit job" icon={<EditOutlined />} />
        ),
        key: "edit",
        onClick: () => {
          if (jobContextValue?.handleEditJob) {
            jobContextValue.handleEditJob(job?.id);
          }
        },
      });
    }
    if (jobContextValue?.permissions?.job_edit) {
      result.push({
        label: (
          <IconText
            text="Archive"
            title="Archive job"
            icon={<SaveOutlined />}
          />
        ),
        key: "archive",
        onClick: () => {
          if (jobContextValue?.handleArchiveJob) {
            jobContextValue.handleArchiveJob(job?.id);
          }
        },
      });
    }
    if (jobContextValue?.permissions?.job_delete) {
      result.push({
        label: (
          <IconText
            text="Delete"
            title="Delete job"
            icon={<DeleteOutlined />}
            className="text-accent-500"
          />
        ),
        key: "delete",
        onClick: () => {
          if (jobContextValue?.handleDeleteJob) {
            jobContextValue.handleDeleteJob(job?.id);
          }
        },
      });
    }

    if (jobContextValue?.permissions?.job_approve) {
      result.push({
        label: (
          <IconText text="Approve" title="Approve" icon={<CheckOutlined />} />
        ),
        key: "approve",
        onClick: () => {
          if (jobContextValue?.handleApproveJob) {
            jobContextValue.handleApproveJob(job?.id);
          }
        },
      });
    }

    return result;
  };

  return (
    <>
      <List.Item
        className="flex gap-4 hover:bg-gray-50 cursor-pointer bg-white rounded-md"
        key={`job-item-${job?.id}`}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <NextLink
              href=""
              passHref
              target={job?.jobUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                if (jobContextValue?.handleViewJob) {
                  jobContextValue.handleViewJob(job?.id);
                }
              }}
            >
              <Typography.Title ellipsis={{ rows: 2 }} level={5}>
                {job?.title || job?.position}
                <Tag className="capitalize text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-3 py-1 ml-2">
                  {job?.status === "pending"
                    ? "Waiting for approval"
                    : job?.status}
                </Tag>
              </Typography.Title>
            </NextLink>
            <Dropdown
              menu={
                jobContextValue.menu.activeKey == "archived"
                  ? { items: getArchieveMenuItems() }
                  : jobContextValue.menu.activeKey == "myJobs"
                  ? { items: getActiveMenuItems() }
                  : { items: getPendingMenuItems() }
              }
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
            {job?.organizationName}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis
            className="flex items-center gap-1 mb-1"
          >
            {job?.location || job?.state}
          </Typography.Paragraph>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mb-1">
              <Typography.Text className="pt-1 text-purple-900 cursor-pointer underline">
                {job?.jobEnrolCount} Applicants
              </Typography.Text>
            </div>
          </div>
        </div>
      </List.Item>
    </>
  );
};

export default JobCard;
