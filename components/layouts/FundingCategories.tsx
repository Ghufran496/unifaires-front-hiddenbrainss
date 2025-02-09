"use client";
import config from "@/app/utils/config";
import { Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CategoryStateInt {
  id: number;
  name: string;
  fundingCount: any;
}

const FundingCategories = ({ fundingCategories, closeAllDrawer }: any) => {
  const router = useRouter();

  const handleRedirect = (id: number, name: string) => {
    router.push(`/funding?categoryId=${id}&title=${name}`);
  };

  return (
    <div>
      <div className="mt-2">
        {fundingCategories?.map((category: CategoryStateInt) => {
          return (
            <Typography.Paragraph
              key={category.id}
              className="font-semibold m-1 pl-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                handleRedirect(category.id, category.name);
                closeAllDrawer();
              }}
            >
              {category.name} ({category?.fundingCount})
            </Typography.Paragraph>
          );
        })}
      </div>
    </div>
  );
};

export default FundingCategories;
