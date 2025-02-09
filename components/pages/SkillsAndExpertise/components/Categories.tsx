"use client";

import React from "react";
import { Checkbox } from "antd";

interface CCProps {
  categories: any;
  handleCategory: any;
}

function Categories({ categories, handleCategory }: CCProps) {
  return (
    <div className="lg:block md:block flex lg:flex-row md:flex-row flex-col gap-[15px] lg:max-h-[300px] md:max-h-[300px] max-h-[260px] lg:overflow-y-scroll md:overflow-y-scroll overflow-y-scroll mb-[40px] mt-2 custom-scrollbar">
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

export default Categories;
