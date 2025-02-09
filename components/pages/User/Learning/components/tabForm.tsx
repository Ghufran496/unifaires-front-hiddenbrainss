"use client";
import { Form, Input, Col, Row, Select, Button } from "antd";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

const TabForm = ({
  myCategories,
  myInstructors,
  setSearchQuery,
  setInstructorSelected,
  setCategorySelected,
  resetFilters,
  businessList,
  setSelectedBusiness,
}: any) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    setSearchQuery("");
    form.resetFields();
    resetFilters();
  };

  return (
    <>
      <Form
        form={form}
        className="mb-8"
        onFinish={(value) => console.log(value)}
      >
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            <div>
              <Form.Item className="rounded-lg" name="categories">
                <Select
                  showSearch
                  allowClear
                  size="large"
                  placeholder="Categories"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={myCategories}
                  onChange={(e) => setCategorySelected(e)}
                  style={{
                    fontWeight: "medium",
                    color: "#000",
                    borderBottom: "none",
                  }}
                />
              </Form.Item>
            </div>
            {/* <div>
              <Form.Item className="mb-0 rounded-lg" name="progress">
                <Select
                  size="large"
                  showSearch
                  placeholder="Progress"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "not-started",
                      label: "Not-Started",
                    },
                    {
                      value: "in-progress",
                      label: "In Progress",
                    },
                  ]}
                  style={{
                    fontWeight: "medium",
                    color: "#000",
                    borderBottom: "none",
                  }}
                />
              </Form.Item>
            </div> */}
            <div>
              <Form.Item className="mb-0 rounded-lg" name="instructor">
                <Select
                  size="large"
                  allowClear
                  showSearch
                  placeholder="Instructor"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={myInstructors}
                  onChange={(e) => setInstructorSelected(e)}
                  style={{
                    fontWeight: "medium",
                    color: "#000",
                    borderBottom: "none",
                  }}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item className="mb-0 rounded-lg" name="business">
                <Select
                  size="large"
                  allowClear
                  showSearch
                  placeholder="Organization"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={businessList}
                  onChange={(e) => setSelectedBusiness(e)}
                  style={{
                    fontWeight: "medium",
                    color: "#000",
                    borderBottom: "none",
                  }}
                />
              </Form.Item>
            </div>
            <div>
              <Button
                type="text"
                size="large"
                className="flex justify-center items-center  font-semibold leading-[28.71px] text-lg"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="">
            <div>
              <Form.Item className="mb-0  rounded-lg">
                <Input.Search
                  onSearch={(value) => setSearchQuery(value)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // onChange={(e) =>
                  //   router.push(`/user/my-learning/?searchBy=${e.target.value}`)
                  // }
                  size="large"
                  placeholder="Search your course"
                  enterButton
                  style={{
                    fontWeight: "medium",
                    color: "#000",
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default memo(TabForm);
