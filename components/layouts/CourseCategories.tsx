"use client";
import config from "@/app/utils/config";
import { Typography } from "antd";
import axios from "axios";
import { RightOutlined, MinusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CategoryStateInt {
  id: number;
  name: string;
  courseCount: any;
}

const CourseCategories = ({ courseCategories, closeAllDrawer }: any) => {
  const router = useRouter();

  const handleRedirect = (id: number, name: string) => {
    router.push(`/courses?categoryId=${id}&title=${name}`);
  };

  return (
    <div>
      <div className="mt-2">
        {courseCategories?.map((category: CategoryStateInt) => {
          return (
            <Typography.Paragraph
              key={category.id}
              className="font-semibold m-1 pl-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                handleRedirect(category.id, category.name), closeAllDrawer();
              }}
            >
              {category.name} ({category?.courseCount})
            </Typography.Paragraph>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCategories;
