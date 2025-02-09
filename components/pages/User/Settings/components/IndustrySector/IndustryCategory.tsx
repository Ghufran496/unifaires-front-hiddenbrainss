"use client";
import React from "react";
import { Checkbox } from "antd";

interface CCProps {
  categories: any;
  handleCategory: any;
}

function IndustryCategory({ categories, handleCategory }: CCProps) {
  return (
    <div className="lg:block md:block flex lg:flex-row md:flex-row flex-col gap-[15px] lg:max-h-full md:max-h-full max-h-[260px] lg:overflow-y-hidden md:overflow-y-hidden overflow-y-scroll mb-[40px]">
      {categories.map(function (category: any, index: any) {
        return (
          <Checkbox key={index} value={category.name} onChange={handleCategory}>
            {category.name}
          </Checkbox>
        );
      })}
    </div>
  );
}

export default IndustryCategory;
