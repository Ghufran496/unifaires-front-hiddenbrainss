"use client";

import { Input } from "antd";

interface SCProps {
  placeholder: string;
  onChange: any;
}

const SidebarSearch = ({ placeholder, onChange }: SCProps) => {
  const { Search } = Input;

  return (
    <>
      <div className="mt-2">
        <Search
          size="large"
          className=""
          onChange={onChange}
          placeholder={placeholder}
          enterButton
          allowClear
        />
      </div>
    </>
  );
};

export default SidebarSearch;
