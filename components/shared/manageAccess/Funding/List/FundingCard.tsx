/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useCallback } from "react";
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
import { FundingListDataType } from "./Datatypes";
import { fundingListContext } from "./FundingListContext";

const FundingCard = ({ fundingData }: { fundingData: FundingListDataType }) => {
  const fundingContext = useContext(fundingListContext);

  const getItemMenuList = useCallback((): MenuProps["items"] => {
    const result: MenuProps["items"] = [];
    if (fundingContext?.permission?.funding_edit) {
      result.push({
        label: (
          <IconText text="Edit" title="Edit course" icon={<EditOutlined />} />
        ),
        key: "edit",
        onClick: () => {
          if (fundingContext?.handleEditUrl) {
            fundingContext.handleEditUrl(fundingData?.id);
          }
        },
      });
    }
    if (
      fundingContext?.permission?.funding_edit &&
      fundingContext?.menu?.activeKey !== "archivedFunding"
    ) {
      result.push({
        label: (
          <IconText
            text="Archive"
            title="Archive course"
            icon={<SaveOutlined />}
          />
        ),
        key: "archive",
        onClick: () => {
          if (fundingContext?.handleArchiveFunding) {
            fundingContext.handleArchiveFunding(fundingData?.id);
          }
        },
      });
    }
    if (
      fundingContext?.permission?.funding_edit &&
      fundingContext?.menu?.activeKey === "archivedFunding"
    ) {
      result.push({
        label: (
          <IconText
            text="Unarchive"
            title="Unarchive funding"
            icon={<SaveOutlined />}
          />
        ),
        key: "open",
        onClick: () => {
          if (fundingContext?.handleUnarchiveFunding) {
            fundingContext.handleUnarchiveFunding(fundingData?.id);
          }
        },
      });
    }

    if (
      fundingContext?.permission?.funding_approve &&
      fundingContext?.menu?.activeKey === "pendingFunding"
    ) {
      result.push({
        label: (
          <IconText
            text="Approve"
            title="Approve course"
            icon={<CheckOutlined />}
          />
        ),
        key: "approve",
        onClick: () => {
          if (fundingContext?.handleApproveFunding) {
            fundingContext.handleApproveFunding(fundingData?.id);
          }
        },
      });
    }

    if (fundingContext?.permission?.funding_delete) {
      result.push({
        label: (
          <IconText
            text="Delete"
            title="Delete course"
            icon={<DeleteOutlined />}
            className="text-accent-500"
          />
        ),
        key: "delete",
        onClick: () => {
          if (fundingContext?.handleDeleteFunding) {
            fundingContext.handleDeleteFunding(fundingData?.id);
          }
        },
      });
    }

    return result;
  }, [fundingContext?.menu?.activeKey]);

  return (
    <>
      <List.Item
        className="flex gap-4 hover:bg-gray-50 cursor-pointer bg-white rounded-md"
        key={`funding-item-${fundingData?.id}`}
      >
        <div className="w-full">
          <div className="flex justify-between">
            <NextLink
              href={""}
              passHref
              target={fundingData?.fundingUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                fundingContext?.handleViewFunding?.(fundingData?.id);
              }}
            >
              <Typography.Title ellipsis={{ rows: 2 }} level={5}>
                {fundingData?.title}
                <Tag className="capitalize text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-3 py-1 ml-2">
                  {fundingData?.status === "pending"
                    ? "Waiting for approval"
                    : fundingData?.status}
                </Tag>
              </Typography.Title>
            </NextLink>
            <Dropdown
              menu={{ items: getItemMenuList() }}
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
            {fundingData?.organizationName}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis
            className="flex items-center gap-1 mb-1"
          >
            {fundingData?.location || fundingData?.state}
          </Typography.Paragraph>
        </div>
      </List.Item>
    </>
  );
};

export default FundingCard;
