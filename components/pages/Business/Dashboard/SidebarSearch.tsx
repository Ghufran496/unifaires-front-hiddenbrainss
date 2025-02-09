"use client";
import { Input } from "antd";

interface SCProps {
  placeholder: string;
}

const SidebarSearch = ({ placeholder }: SCProps) => {
  const { Search } = Input;

  return (
    <>
      <div className="mt-2">
        <Search
          size="large"
          className=""
          placeholder={placeholder}
          enterButton
          allowClear
        />
      </div>
    </>
  );
};

export default SidebarSearch;
