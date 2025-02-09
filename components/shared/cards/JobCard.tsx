"use client";

import NextLink from "next/link";
import {
  Typography,
  List,
  Dropdown,
  Button,
  MenuProps,
  message,
  Tag,
} from "antd";
import {
  BankOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { CourseInt } from "@/app/utils/interface";
import IconText from "../IconText";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

export interface JobCardProps extends CourseInt {}
// props: JobCardProps
const JobCard = ({ job, fetchJob, archive, currentPage }: any) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/business/jobs/create/${job.id}`);
  };

  const handleDelete = async () => {
    let deleteEndpoint;
    if (archive) {
      deleteEndpoint = "archieve-jobs/business";
    } else {
      deleteEndpoint = "jobs";
    }
    try {
      const response = await axiosInstance.delete(
        `/${deleteEndpoint}/${job.id}`
      );
      if (response.status) {
        fetchJob(currentPage);
        message.success("Job deleted successfully");
      }
    } catch (error) {
      console.log("An error occured while deleting the course", error);
      handleAxiosError(error);
    }
  };

  const handleArchiveJob = async () => {
    try {
      const res = await axiosInstance.put(`/jobs/business/${job.id}`, {
        status: "archive",
      });

      if (res.status) {
        fetchJob(currentPage);
        showSuccess("Job Archived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleOpenJob = async () => {
    try {
      const res = await axiosInstance.put(`/jobs/business/${job.id}`, {
        status: "opened",
      });

      if (res.status) {
        fetchJob(currentPage);
        showSuccess("Job Unarchived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: <IconText text="Edit" title="Edit job" icon={<EditOutlined />} />,
      key: "edit",
      onClick: handleEdit,
    },
    {
      label: (
        <IconText text="Archive" title="Archive job" icon={<SaveOutlined />} />
      ),
      key: "archive",
      onClick: handleArchiveJob,
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete job"
          icon={<DeleteOutlined />}
          className="text-accent-500"
        />
      ),
      key: "delete",
      onClick: handleDelete,
    },
  ];

  const archiveItems: MenuProps["items"] = [
    {
      label: (
        <IconText text="Edit" title="Edit course" icon={<EditOutlined />} />
      ),
      key: "edit",
      onClick: handleEdit,
    },
    {
      label: (
        <IconText
          text="Unarchive"
          title="Unarchive job"
          icon={<SaveOutlined />}
        />
      ),
      key: "open",
      onClick: handleOpenJob,
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete"
          icon={<DeleteOutlined />}
          className="text-accent-500"
        />
      ),
      key: "delete",
      onClick: handleDelete,
    },
  ];
  return (
    <>
      <List.Item
        className="flex gap-4 hover:bg-gray-50 cursor-pointer bg-white rounded-md"
        key={`job-item-${job?.id}`}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <NextLink
              href={`/business/jobs/${job.id}`}
              passHref
              target={job?.jobUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <Typography.Title ellipsis={{ rows: 2 }} level={5}>
                {job?.title || job?.position}
                <Tag className="capitalize text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-3 py-1 ml-2">
                  {job?.status}
                </Tag>
              </Typography.Title>
            </NextLink>
            <Dropdown
              menu={archive ? { items: archiveItems } : { items }}
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
