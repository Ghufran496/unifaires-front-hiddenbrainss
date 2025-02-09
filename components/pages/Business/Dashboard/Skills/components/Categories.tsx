"use client";
import React from "react";
import { Checkbox } from "antd";

interface CCProps {
  categories: any;
  handleCategory: Function;
}

function Categories({ categories, handleCategory }: CCProps) {
  return (
    <div className="flex flex-col gap-[15px] max-h-[260px] overflow-y-scroll mb-[40px]">
      {categories.map(function (category: any, index: any) {
        return (
          <Checkbox key={index} value={category.name}>
            {category.name}
          </Checkbox>
        );
      })}
    </div>
  );
}

export default Categories;
