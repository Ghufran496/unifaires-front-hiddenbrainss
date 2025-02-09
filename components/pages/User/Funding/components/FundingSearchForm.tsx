"use client";
import { Form, Input, Select, Button } from "antd";
import { useRouter } from "next/navigation";
import { memo } from "react";

const TabForm = ({ setSearchTerms }: any) => {
  const [form] = Form.useForm();

  const route = useRouter();

  return (
    <div>
      <div className="flex flex-wrap lg:justify-center md:justify-start gap-2 mb-4 w-full">
        {/* <Form.Item className="text-base font-medium rounded-lg">
          <Select
            size="large"
            showSearch
            placeholder="Sort By"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "date-created",
                label: "Date created",
              },
              {
                value: "recently-accessed",
                label: "Recently Accessed",
              },
            ]}
            style={{
              fontWeight: "medium",
              color: "#000",
              borderBottom: "none",
            }}
          />
        </Form.Item>

        <Form.Item className=" rounded-lg">
          <Select
            showSearch
            size="large"
            placeholder="Filter by"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "all",
                label: "All",
              },
              {
                value: "organisation",
                label: "Organisation",
              },
              {
                value: "instructor",
                label: "Instructor",
              },
            ]}
            style={{
              fontWeight: "medium",
              color: "#000",
              borderBottom: "none",
            }}
          />
        </Form.Item>

        <Button
          type="primary"
          size="large"
          className="rounded-md w-[106px] h-55 flex-shrink-0 font-semibold leading-[28.71px] text-lg"
          style={{
            background: "#E9ECEF",
            color: "#5832DA",
          }}
        >
          Reset
        </Button> */}

        <Form.Item className="mb-0 rounded-lg w-full">
          <Input.Search
            onSearch={(value) => route.push(`/user/funding/?searchBy=${value}`)}
            size="large"
            placeholder="Search your Funding"
            enterButton
            className="bg-transparent border-none placeholder-black text-black"
            style={{
              fontWeight: "medium",
              color: "#000",
            }}
            onChange={(e) => setSearchTerms(e.target.value)}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default memo(TabForm);
