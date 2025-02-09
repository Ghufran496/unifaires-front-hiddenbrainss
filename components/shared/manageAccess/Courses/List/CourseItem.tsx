/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useCallback } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button, MenuProps, List, Space, Dropdown, Typography } from "antd";
import {
  StarFilled,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  UsergroupAddOutlined,
  EyeOutlined,
  BookOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import IconText from "@/components/shared/IconText";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CourseListItemType } from "./Datatypes";
import { courseListContext } from "@/components/shared/manageAccess/Courses/List/couseListContext";

interface CourseItemProps {
  course: CourseListItemType;
}

const CourseItem = ({ course }: CourseItemProps) => {
  const router = useRouter();
  const courseContext = useContext(courseListContext);

  /**
   * Get JSON parse result
   */
  const getJSONParse = (inputStr: string = "") => {
    try {
      return JSON.parse(inputStr);
    } catch (error) {
      return undefined;
    }
  };

  /**
   * Get image
   */
  const getImage = useCallback((): string => {
    if (typeof course?.image === "string" && course.image.trim() !== "") {
      return course.image.trim();
    }
    const courseMeta = getJSONParse(course?.meta);
    if (
      typeof courseMeta?.image === "string" &&
      courseMeta.image.trim() !== ""
    ) {
      return courseMeta.image.trim();
    }

    return "";
  }, [course]);

  /**
   * Get course item menus
   */
  const getCourseItemMenu = (): MenuProps["items"] => {
    const result: MenuProps["items"] = [];
    if (courseContext?.permissions?.content_edit) {
      result.push({
        label: (
          <IconText text="Edit" title="Edit course" icon={<EditOutlined />} />
        ),
        key: "edit",
        onClick: () => {
          if (courseContext?.handleEditCourse) {
            courseContext.handleEditCourse(course?.id);
          }
        },
      });
    }
    if (
      courseContext?.permissions?.content_edit &&
      courseContext?.menu?.activeKey === "publishedCourses"
    ) {
      result.push({
        label: (
          <IconText
            text="Archive"
            title="Archive course"
            icon={<BookOutlined />}
          />
        ),
        key: "archive",
        onClick: () => {
          if (courseContext?.handleArchiveCourse) {
            courseContext.handleArchiveCourse(course?.id);
          }
        },
      });
    }
    if (
      courseContext?.permissions?.content_edit &&
      courseContext?.menu?.activeKey === "archive"
    ) {
      result.push({
        label: (
          <IconText
            text="Activate course"
            title="Activate course"
            icon={<BookOutlined />}
          />
        ),
        key: "unarchive",
        onClick: () => {
          if (courseContext?.handleUnArchieveCourse) {
            courseContext.handleUnArchieveCourse(course?.id);
          }
        },
      });
    }
    if (courseContext?.permissions?.content_view) {
      result.push({
        label: (
          <IconText text="View" title="View Course" icon={<EyeOutlined />} />
        ),
        key: "view",
        onClick: () => {
          if (courseContext?.handleViewUrl) {
            courseContext.handleViewUrl(course?.id);
          }
        },
      });
    }
    if (courseContext?.permissions?.content_delete) {
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
          if (courseContext?.handleDeleteCourse) {
            courseContext.handleDeleteCourse(course?.id);
          }
        },
      });
    }
    if (
      courseContext?.permissions?.content_approve &&
      courseContext?.menu?.activeKey === "pending"
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
          if (courseContext?.handleApproveCourse) {
            courseContext.handleApproveCourse(course?.id);
          }
        },
      });
    }

    return result;
  };

  /**
   * Format currency
   */
  const formatCurrency = (value: any): string => {
    if (Number.isNaN(parseFloat(value))) {
      return "0";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(value));
  };

  const pricingAmount: number = !Number.isNaN(
    parseFloat(course?.pricing?.amount)
  )
    ? parseFloat(course.pricing.amount)
    : 0;
  const pricingDiscount = !Number.isNaN(parseFloat(course?.pricing?.discount))
    ? parseFloat(course.pricing.discount)
    : 0;
  const salesPrice = pricingAmount - pricingAmount * (pricingDiscount / 100);

  return (
    <List.Item className="flex gap-4" key={`course-item-${course.id}`}>
      <Link
        href={`/business/courses/${course.id}`}
        passHref
        className="rounded-lg overflow-hidden w-24 h-20"
      >
        <Image
          alt="logo"
          width={96}
          height={80}
          objectFit="cover"
          src={getImage()}
        />
      </Link>
      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <NextLink
            passHref
            href=""
            onClick={(event) => {
              event.preventDefault();
              if (courseContext?.handleViewUrl) {
                courseContext.handleViewUrl(course?.id);
              }
            }}
            className="text-grey-900 hover:text-purple-500 font-semibold text-base flex-grow"
          >
            {typeof course?.title === "string" ? course.title : ""}
          </NextLink>
          <Dropdown
            menu={{ items: getCourseItemMenu() }}
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
        <Space className="gap-3 flex-wrap mb-2">
          <IconText
            title="course author"
            text={
              typeof course?.organizationName === "string"
                ? course.organizationName
                : ""
            }
            icon={<UserOutlined />}
          />
          <IconText
            title="students"
            text={`${course?.students ? course.students : "0"} students`}
            icon={<UsergroupAddOutlined />}
          />
          <IconText
            title="ratings"
            text={course?.averageRating}
            icon={<StarFilled className="text-yellow-500" />}
          />
        </Space>
        <div className="flex gap-3">
          {!course?.pricing || course?.pricing?.type === "free" ? (
            <Typography.Paragraph className="text-base font-bold text-gray-600 mb-0">
              Free
            </Typography.Paragraph>
          ) : (
            <Typography.Paragraph className="text-base font-bold text-gray-600 mb-0">
              {formatCurrency(salesPrice || 0)}{" "}
              <span className="line-through font-semibold text-sm">
                ${course?.pricing?.amount}
              </span>
            </Typography.Paragraph>
          )}
          <Typography.Paragraph>
            Status:{" "}
            <span className="font-bold italic text-blue-500">
              {course?.status === "pending"
                ? "Waiting for approval"
                : course?.status}
            </span>
          </Typography.Paragraph>
        </div>
      </div>
    </List.Item>
  );
};

export default CourseItem;
