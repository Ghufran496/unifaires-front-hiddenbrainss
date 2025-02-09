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

export interface FundingCardProps extends CourseInt {}
const FundingCard = ({ funding, fetchFunding, listType }: any) => {
  const eachFunding = funding.funding;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/enrol-funding/${funding.id}`
      );
      if (response.status) {
        fetchFunding();
        toast.success("Funding deleted successfully");
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("An error occured while deleting the funding", error);
    }
  };

  const handleSaveDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/funding-wish/${funding.id}`
      );
      if (response.status) {
        fetchFunding();
        toast.success("Funding deleted successfully");
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("An error occured while deleting the funding", error);
    }
  };

  const handleWithdrawn = async () => {
    try {
      const response = await axiosInstance.put(`/enrol-funding/${funding.id}`, {
        fundingUserStatus: "cancelled",
      });
      if (response.status) {
        fetchFunding();
        toast.success("Funding Application Cancelled successfully");
      }
    } catch (error) {
      handleAxiosError(error);
      toast.error("Error occured while Cancelling Application");
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
          title="Delete Funding"
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
        key={`funding-item-${funding.id}`}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <NextLink
              href={`/user/funding/${eachFunding.id}`}
              passHref
              target={funding.fundingUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <Typography.Title ellipsis={{ rows: 2 }} level={5}>
                {eachFunding.title || eachFunding.position}
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
            {eachFunding.organizationName}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis
            className="flex items-center gap-1 mb-1"
          >
            {eachFunding.location || eachFunding.state}
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

export default FundingCard;
