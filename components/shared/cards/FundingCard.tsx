"use client";
import React, { Fragment } from "react";
// next
import NextLink from "next/link";
// ants and icons
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
  StarFilled,
  BankOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  ShareAltOutlined,
  SaveOutlined,
} from "@ant-design/icons";
// interface and props
import { CourseInt } from "@/app/utils/interface";
// icons and images
// import fundingImage from "@public/images/courses/laravel.jpg";
//interface
import { JobInt } from "@/components/pages/Business/Jobs/job.interface";
import IconText from "../IconText";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

export interface FundingCardProps extends CourseInt {}
// props: FundingCardProps
const FundingCard = ({ funding, fetchFunding, archive, currentPage }: any) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/business/funding/create/${funding.id}`);
  };

  const handleDelete = async () => {
    let deleteEndpoint;
    if (archive) {
      deleteEndpoint = "archieve-funding/business";
    } else {
      deleteEndpoint = "funding";
    }
    try {
      const response = await axiosInstance.delete(
        `/${deleteEndpoint}/${funding.id}`
      );
      if (response.status) {
        fetchFunding(currentPage);
        showSuccess("Funding Deleted Successfully");
      }
    } catch (error) {
      console.log("An error occured while deleting the course", error);
      handleAxiosError(error);
    }
  };

  const handleArchivefunding = async () => {
    try {
      const res = await axiosInstance.put(`/funding/business/${funding.id}`, {
        status: "archive",
      });

      if (res.status) {
        fetchFunding(currentPage);
        showSuccess("Funding Archived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const handleOpenFunding = async () => {
    try {
      const res = await axiosInstance.put(`/funding/business/${funding.id}`, {
        status: "active",
      });

      if (res.status) {
        fetchFunding(currentPage);
        showSuccess("Funding Unarchived Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const items: MenuProps["items"] = [
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
          text="Archive"
          title="Archive course"
          icon={<SaveOutlined />}
          // className="text-accent-500"
        />
      ),
      key: "archive",
      onClick: handleArchivefunding,
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete course"
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
          title="Unarchive funding"
          icon={<SaveOutlined />}
          // className="text-accent-500"
        />
      ),
      key: "open",
      onClick: handleOpenFunding,
    },
    {
      label: (
        <IconText
          text="Delete"
          title="Delete course"
          icon={<DeleteOutlined />}
          className="text-accent-500"
        />
      ),
      key: "delete",
      onClick: handleDelete,
    },
  ];

  return (
    <Fragment>
      <List.Item
        className="flex gap-4 hover:bg-gray-50 cursor-pointer bg-white rounded-md"
        key={`funding-item-${funding.id}`}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <NextLink
              href={`/business/funding/${funding?.id}`}
              passHref
              target={funding?.fundingUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <Typography.Title ellipsis={{ rows: 2 }} level={5}>
                {funding.title}
                <Tag className="capitalize text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-3 py-1 ml-2">
                  {funding.status}
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
            {funding.organizationName}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis
            className="flex items-center gap-1 mb-1"
          >
            {funding.location || funding.state}
          </Typography.Paragraph>
          {/* <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mb-1">
              <Typography.Text className="pt-1 text-purple-900 cursor-pointer underline">
                10 Applicants
              </Typography.Text>
            </div>
          </div> */}
          {/* <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mb-1">
              <Typography.Text type="warning" className="pt-1">
                4.5
              </Typography.Text>
              <StarFilled style={{ color: "#F59E0B" }} className=" mt-1" />
              <Typography.Text className="pt-1">(344)</Typography.Text>
            </div>
          </div> */}
        </div>
      </List.Item>
    </Fragment>
  );
};

export default FundingCard;
